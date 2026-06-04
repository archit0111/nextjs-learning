import { connectDB } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Cart from "@/app/modals/cart";
import { jwtVerify } from "jose";

export async function PATCH(req:NextRequest){
    try{
        await connectDB();
        const {searchParams} = new URL(req.url);
        const productId =  searchParams.get("id");
        const body = await req.json();
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized access!" }, { status: 401 });
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;
        if(!productId){
            return NextResponse.json({success:false,message:"ID is not present"});
        }
        let cart = await Cart.findOne({userId:userId});
        if(!cart){
          cart = await Cart.create({userId:userId,items:[{productId}]});
          return NextResponse.json({status:true,message:"Item added in cart successfully!"})
        }
        if(body.operation === "add"){
            cart.items.push({productId});
        }else if(body.operation === "remove"){
            cart.items.pop({productId});
        }
        await cart.save();
        return NextResponse.json({status:true,message:"Item added in cart successfully!"});

    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in adding item in cart: ${e}`});
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
        const cart = await Cart.findOne({userId:userId}).populate("items.productId");
        if (!cart){
            return NextResponse.json({ success: true, message: "Cart is empty" }, { status: 200 });
        }
        const products = cart.items;
        return NextResponse.json({success:true,products,message:"Cart products fetched!"});
    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in fetching item for cart: ${e},{status:500}`});
    }
}