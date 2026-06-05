import Product from "@/app/modals/product";
import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request){
    try{
        await connectDB();
        const {searchParams} = new URL(req.url);
        const search = searchParams.get("search") || "";
        const searchRegex = new RegExp(search,"i");
        const limit = 8;
        const page = parseInt(searchParams.get("page") || "1");
        const skip=(page-1)*limit;

        if(search===""){
            const products = await Product.find({}).skip(skip).limit(limit);
            const totalProducts=await Product.countDocuments({})
            const totalPages = Math.ceil(totalProducts/limit);
            return NextResponse.json({success:true, products, pagination:{currentPage:page,totalPages,totalProducts}});
        }
        const products = await Product.find({$or:[{title:searchRegex},{categories:searchRegex}]}).skip(skip).limit(limit);
        const totalProducts=await Product.countDocuments({$or:[{title:searchRegex},{categories:searchRegex}]});
        const totalPages = Math.ceil(totalProducts/limit);
        return NextResponse.json({success:true, products, pagination:{currentPage:page,totalPages,totalProducts}});
        
    }catch(e){
        return NextResponse.json({success:false, message: `Error in fetching products: ${e}`},{status:500});
    }
}