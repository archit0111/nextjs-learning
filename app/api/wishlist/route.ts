import { connectDB } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import Wishlist from "@/app/modals/wishlist";

export async function PATCH(req:NextRequest){
    try{
        await connectDB();
        const {searchParams} = new URL(req.url);
        const productId =  searchParams.get("id");
        const body = await req.json();
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({success:false,message:"token not provided"},{status:401});
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;
        if(!productId){
            return NextResponse.json({success:false,message:"ID is not present"});
        }
        let wishlist = await Wishlist.findOne({userId:userId});
        if(!wishlist){
          wishlist = await Wishlist.create({userId:userId,items:[{productId}]});
          return NextResponse.json({status:true,message:"Item added in wishlist successfully!"})
        }
        if(body.operation === "add"){
            wishlist.items.push({productId});
        }else if(body.operation === "remove"){
            wishlist.items.pop({productId});
        }
        await wishlist.save();
        return NextResponse.json({status:true,message:"Item added in wishlist successfully!"});

    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in adding item in wishlist: ${e}`});
    }
}

export async function GET(req:NextRequest){
    try{
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;
        const wishlist = await Wishlist.findOne({userId}).populate("items.productId");
        if (!wishlist){
            return NextResponse.json({ success: true, message: "Wishlist is empty" }, { status: 200 });
        }
        const products = wishlist.items;
        return NextResponse.json({success:true,products,message:"Wishlist products fetched!"});
    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in fetching item for wishlist: ${e},{status:500}`});
    }
}