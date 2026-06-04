import { connectDB } from "@/app/lib/db";
import User from "@/app/modals/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";


export async function POST(req:Request){
    try{
        await connectDB();
        const user = await req.json();
        const userExist = await User.findOne({email:user.email});
        if(!userExist){
            return NextResponse.json({success:false,message:"Invalid Credentials! user not exist"},{status:404});
        }
        const  isPasswordCorrect = await bcrypt.compare(user.password,userExist.password)
        if(!isPasswordCorrect){
            return NextResponse.json({success:false,message:"Invalid Credentials!"},{status:401});
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({
            userId:userExist._id.toString(),
            email:userExist.email
        })
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);

        const response =  NextResponse.json({success:true,message:"User login Successfully!",userExist});

        response.cookies.set({
            name:"token",
            value:token,
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60*60*24,
            path:"/"
        })

        return response;

    }catch(e){
        return NextResponse.json({success:false,status:500,message:e});
    }
}
