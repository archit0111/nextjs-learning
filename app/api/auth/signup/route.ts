import { connectDB } from "@/app/lib/db";
import User from "@/app/modals/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/app/lib/validation";


export async function POST(req:Request){
    try{
        await connectDB();
        const body = await req.json();
        const {error,value}=signupSchema.validate(body,{abortEarly:false});
                if(error){
                    const errorMessages = error.details.map((detail)=>detail.message);
                    return NextResponse.json({
                        success:false,
                        message:"Validation Error",
                        errors:errorMessages
                    },{status:400});
                }
                const {name,email,password} = value;
        const userExist = await User.findOne({email:email});
        if(userExist){
            return NextResponse.json({success:true,message:"User exist already! login please"},{status:409});
        }
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password,salt);
        const updatedUser = {
            name:name,
            email:email,
            password:hashedPassword
        }
        const createdUser = await User.create(updatedUser);
        return NextResponse.json({success:true,message:"User created Successfully!",createdUser},{status:201});
    }catch(e){
        return NextResponse.json({success:false,message:e},{status:500});
    }
}
