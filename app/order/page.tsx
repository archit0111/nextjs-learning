"use client"
import Nav from "@/app/components/Nav";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "../components/Footer";

export default function Order(){

    const [loading,setLoading]=useState(false);
    const [product,setProduct]=useState<any>({});
    const param = useSearchParams();
    const id = param.get('id');
    const [priceAfterDiscount,setPriceAfterDiscount]=useState<any>(null);
    const [price,setPrice]=useState<any>(null);

    useEffect(()=>{
        if(!id) return;
        const fetchProduct = async()=>{
             try{
                setLoading(true);
                const res = await fetch(`/api/products/${id}`,{
                method:"GET",
                headers:{"content-Type":"application/json"}}
            );
            const data = await res.json();
            if(data.success){
                const product = data.product;
                setProduct(data.product);
                setPrice(product.price);
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

    function handelPrice(){
        const price = product.price;
        const newPrice = price-((price*5)/100);
        setPriceAfterDiscount(newPrice);
    }


    const handelOrder = async()=>{
        alert("working...");
    }

    return(
        <>
        <Nav/>
        <div className="mt-10">{loading?(<div className="flex justify-center bg-amber-100 w-[75%] rounded-2xl mx-auto items-center h-44 font-bold text-amber-800"> Loading...</div>):null}</div>
        <div className="place-items-center grid grid-cols-1 gap-4 sm:flex p-4 shadow-sm">
            <section className="h-fit w-full sm:sw-1/3 flex justify-center p-4">
            <img src={product.image+"/300"} alt={product.title} className="max-h-60 object-contain" />
            </section>
            <section className="h-fit w-full sm:w-2/3 p:4">
                    <p className="font-semibold sm:text-lg text-sm pb-2 text-gray-800">{product.title}</p>
                    <p className="mb-8 text-gray-600 text-sm">{product.description}</p>
                    <p className="font-bold text-xl">Price : ₹{product.price}</p>
            </section>
        </div>
        <div className="mx-4 mt-10">
            <h3 className="ml-4 pl-4 font-bold mt-10 text-xl mb-5">Product Details:</h3>
            <table className="w-full ">
                <tr className="table-fixed justify-center border-collapse border border-gray-200 text-sm sm:text-base">
                    <td className="text-center items-center font-semibold border-r border p-2 w-1/2">Product</td>
                    <td className="w-1/2 text-sm wrap-break-word pl-2 items-center">{product.title}</td>
                </tr>
                <tr className="table-fixed justify-center border-collapse border border-gray-200 text-sm sm:text-base">
                    <td className="text-center items-center font-semibold border-r border p-2 w-1/2">Discription</td>
                    <td className="w-1/2 text-sm wrap-break-word pl-2 items-center">{product.description}</td>
                </tr>
                <tr className="table-fixed justify-center border-collapse border border-gray-200 text-sm sm:text-base">
                    <td className="text-center items-center font-semibold border-r border p-2 w-1/2">Price</td>
                    <td className="w-1/2 text-sm wrap-break-word pl-2 items-center">{product.price}</td>
                </tr>
                <tr className="table-fixed justify-center border-collapse border border-gray-200 text-sm sm:text-base">
                    <td className="text-center items-center font-semibold border-r border p-2 w-1/2">Offer details</td>
                    <td className="w-1/2 text-sm wrap-break-word pl-2 items-center">Offer upto 15% and more...</td>
                </tr>
            </table>
        </div>
        <div className="mt-10 px-4">
            <h3 className="ml-4 pl-4 font-bold mt-10 text-xl mb-5">Offer Details:</h3>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">Discount available</p>
                </div>
                <div className="item-center px-4">
                    5%
                </div>
                </div>
                <div className="flex justify-center mt-5"><button onClick={handelPrice} className="text-center p-1 px-4 hover:bg-green-500 bg-green-400 border rounded-2xl">Apply discount</button></div>
        </div>
        <div className="mt-10 px-4 grow">
            <h3 className="ml-4 pl-4 font-bold mt-10 text-xl mb-5">Price Details:</h3>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">Product price</p>
                </div>
                <div className="item-center px-4">
                    {product.price}
                </div>
             </div>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">GST <span className="font-light">(included)</span></p>
                </div>
                <div className="item-center px-4">
                    <p>18%</p>
                </div>
             </div>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">Delivery charges <span className="font-light">(included)</span></p>
                </div>
                <div className="item-center px-4">
                    <p>120</p>
                </div>
             </div>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">Discount</p>
                </div>
                <div className="item-center px-4">
                    <p>5%</p>
                </div>
             </div>
             <div className="flex justify-between p-2">
                <div className="item-center">
                    <p className="font-semibold pl-2">Price on discount</p>
                </div>
                <div className="item-center px-4">
                    {priceAfterDiscount===null?`${product.price}`:priceAfterDiscount}
                </div>
             </div>
        </div>
        <div className="mt-5 flex justify-center grow">
            <button className="border rounded-2xl px-4 p-2 bg-green-400 hover:bg-green-500 transition-all hover:scale-105"><p className="font-semibold" onClick={handelOrder}>{`Place order for ${priceAfterDiscount===null?`${product.price}`:priceAfterDiscount}`}</p></button>
        </div>
        <Footer/>
        </>
        );
    }