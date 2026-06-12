import { connectDB } from "@/app/lib/db";
import Product from "@/app/modals/product";
import { NextResponse } from "next/server";

export async function GET(req: Request,{params}:{params:Promise<{id:string}>}){
    try{
        await connectDB();
        const resolvedParams = await params;
        const id = resolvedParams.id;
        console.log(id);
        const product= await Product.findById(id);
        if(!product){
            return NextResponse.json({ success: false, message: "Product not found!" }, { status: 404 });
        }
        return NextResponse.json({ success: true, product }, { status: 200 });
    }catch(e){
        return NextResponse.json({ success: false, message: `Error occered in product fetching!`}, { status: 500 });
    }
}