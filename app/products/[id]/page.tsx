"use client"

import Nav from "@/app/components/Nav"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Discription(){
    const params = useParams();
    const productId = params.id;
    const [product,setProduct] = useState<any>({});
    const [loading, setLoading] = useState(true);

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
                alert("fetched")
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
    },[])

    return (
        <>
        <Nav/>
        <div className="mt-5 place-content-center">
            <div className="sm:flex">
                <section className="">
                    
                </section>
                <section className="">
                    gghjgj
                </section>
            </div>
        </div>
        </>
    )
}