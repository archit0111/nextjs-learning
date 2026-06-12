"use client"

import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function Discription(){
    const params = useParams();
    const productId = params.id;
    const [product,setProduct] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        if(!productId) return;
        const fetchProduct = async()=>{
             try{
                setLoading(true);
                const res = await fetch(`/api/products/${productId}`,{
                method:"GET",
                headers:{"content-Type":"application/json"}}
            );
            const data = await res.json();
            if(data.success){
                setProduct(data.product);
            }else{
                alert(data.message);
            }
            }catch(e){
                alert("error in feching product!");
            }finally{
                setLoading(false);
            }
        }
        fetchProduct();
    },[]);


    const handelAddToCart = async(e:React.MouseEvent,id:string)=>{
        e.stopPropagation();
        const res = await fetch(`/api/cart?id=${id}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({operation:"add"})
        });
        if(res.status===200){
            alert("Item added to cart!");
        }else{
            alert("Error occered in adding item");
        }
    }
    
    const handelAddToWishlist = async(e:React.MouseEvent,id:string)=>{
        e.stopPropagation();
        const res = await fetch(`/api/wishlist?id=${id}`,{
            method:"PATCH",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({operation:"add"})
        });
        if(res.status){
            alert("Item added to wishlist!");
        }else{
            alert("Error occered in adding item");
        }
    }

    return (
        <>
        <Nav/>
        <div className="mt-25 mx-4 place-content-center">
            <div className={loading?"flex justify-center bg-amber-100 w-[75%] rounded-2xl m-20 items-center h-45 font-bold":"hidden"}>Loading...</div>
            <div className="place-items-center grid grid-cols-1 gap-4 sm:flex pl-2">
                    <section className="h-fit w-fit p-4">
                        <img src={product.image+"/300"} alt={product.image} />
                    </section>
                    <section className="h-fit w-fit">
                        <div className="p-4"><p className="font-semibold sm:text-lg text-sm pb-2">{product.title}</p>
                        <p className="mb-8">{product.description}</p>
                        <p className="font-bold ">Price : {`₹${product.price}`}</p>
                        </div>
                    </section>
            </div>
            <div className="text-center mt-10 p-2">
                <button className="w-full lg:block lg:place-self-center lg:w-[50%] p-1 rounded-2xl mt-2 bg-yellow-200 hover:bg-yellow-400 transition-all hover:scale-95 duration-400" onClick={()=>router.push(`/order?id=${product._id}`)}>Order now</button>
                <button className="w-full lg:block lg:place-self-center lg:w-[50%] p-1 rounded-2xl mt-2 bg-green-200 hover:bg-green-400 transition-all hover:scale-95 duration-400" onClick={(e)=>(handelAddToCart(e,product._id))}>Add to cart</button>
                <button className="w-full lg:block lg:place-self-center lg:w-[50%] p-1 rounded-2xl mt-2 bg-pink-200 hover:bg-pink-400 transition-all hover:scale-95 duration-400" onClick={(e)=>(handelAddToWishlist(e,product._id))}>Add to wishlist</button>
            </div>
        </div>
        <div className="grow"></div>
        <Footer/>
        </>
    )
}

