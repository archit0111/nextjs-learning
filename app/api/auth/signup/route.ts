import { connectDB } from "@/app/lib/db";
import User from "@/app/modals/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req:Request){
    try{
        await connectDB();
        const user = await req.json();
        const userExist = await User.findOne({email:user.email});
        if(userExist){
            return NextResponse.json({success:true,message:"User exist already! login please"},{status:409});
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        const updatedUser = {
            name:user.name,
            email:user.email,
            password:hashedPassword
        }
        const createdUser = await User.create(updatedUser);
        return NextResponse.json({success:true,message:"User created Successfully!",createdUser},{status:201});
    }catch(e){
        return NextResponse.json({success:false,message:e},{status:500});
    }
}
