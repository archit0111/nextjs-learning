import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";
import Product from "@/app/modals/product";

export async function PATCH(req:Request){
    try{
        await connectDB();
        const {searchParams} = new URL(req.url);
        const productId =  searchParams.get("id");
        if(!productId){
            return NextResponse.json({success:false,message:"ID is not present"});
        }
        const body = await req.json();
        const updatedProduct = await Product.findByIdAndUpdate(productId,{$set:body},{new:true});
        return NextResponse.json({status:true,message:"Item added in cart successfully!",updatedProduct});

    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in adding item in cart: ${e}`});
    }
}

export async function GET(){
    try{
        const products = await Product.find({cart:true});
        return NextResponse.json({success:true,products,message:"Cart products fetched!"});
    }catch(e){
        return NextResponse.json({success:false,message:`Some error occered in fetching item for cart: ${e},{status:500}`});
    }
}