import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req:NextRequest){
    const token = req.cookies.get("token")?.value;
    const {pathname} = req.nextUrl;


    if(pathname.startsWith("/cart")||pathname.startsWith("/wishlist")){
        if (!token) {
        return NextResponse.json({message:"Token not provided!"},{status:404});
    }
        try{
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token,secret);
            return NextResponse.next();
        }catch(e){
            return NextResponse.json({message:"Invalid token!"});
        }
    }


    return NextResponse.next();
}

export const config = {
    matcher:["/cart/:path*","/wishlist"]
};