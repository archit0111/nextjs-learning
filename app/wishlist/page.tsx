"use client"
import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer";

export default function Cart(){

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        const fetchProducts = async()=>{
            const data = await fetch('/api/wishlist',{
            method:"GET",
            headers:{
                'content-Type':'application/json'
            }
            }) ;
            const result = await data.json();
            setProducts(result.products || []);
            }
            fetchProducts();
    },[]);

    const handelAddToCart = async(id:string)=>{
        const res = await fetch(`/api/cart?id=${id}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({operation:"add"})
        });
        if(res.status){
            alert("Item added to cart!");
        }else{
            alert("Error occered in adding item");
        }
    }
    
    const handelRemoveFromWishlist = async(id:string)=>{
        const res = await fetch(`/api/wishlist?id=${id}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({operation:"remove"})
        });
        if(res.status){
            alert("Wishlist Updated!");
        }else{
            alert("Error occered in adding item");
        }
    }

    const handelOrder =()=>{
        alert("Work in progress!");
    }

    return(
        <>
        <div className="flex justify-between mx-3 pt-3 px-4 lg:mx-5">
            <div className="text-4xl w-[25%]">StoreAtDoor</div>
            <div className="text-lg gap-6 items-center flex">
                <div className="font-xl">Wishlist</div>
            </div>
        </div>
        <div className="p-4 place-items-center grow content-center mt-10">
            {products.length===0?
            <div className={`flex justify-center bg-amber-100 w-[75%] rounded-2xl m-20 items-center h-45 font-bold place-self-center`}>NO PRODUCT FOUND...</div>
            :<div className="grid sm:grid-cols-2 gap-10">{(products.map((item:any)=>(
                <div className="p-4 py-5 bg-red-50 w-[80%] rounded-2xl shadow-2xl transition-all hover:-translate-y-1 duration-300" key={item._id}>
                <img src={item.productId?.image + "/300"} alt="item.image" className="text-center place-self-center transition-all hover:scale-105 duration-300 mb-3" />
                <div className="pt-2 pl-2">
                    <div className="font-bold">Price : {`₹${item.productId?.price}`}</div>
                        <div className="font-semibold">{item.productId?.title}</div>
                            <div className="font-extralight text-sm">{item.productId?.description}</div>
                    </div>
                    <div className="text-center p-2">
                        <button className="w-full p-1 rounded-2xl mt-2 bg-yellow-200 hover:bg-yellow-400 transition-all hover:scale-95 duration-400" onClick={handelOrder}>Order now</button>
                        <button className="w-full p-1 rounded-2xl mt-2 bg-green-200 hover:bg-green-400 transition-all hover:scale-95 duration-400" onClick={()=>(handelAddToCart(item._id))}>Add to cart</button>
                        <button className="w-full p-1 rounded-2xl mt-2 bg-pink-200 hover:bg-pink-400 transition-all hover:scale-95 duration-400" onClick={()=>(handelRemoveFromWishlist(item._id))}>Remove from wishlist</button>
                    </div>
            </div>
            )))}</div>}
        </div>
        <Footer/>
        </>
    )
}