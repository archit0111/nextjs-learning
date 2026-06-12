"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Products(){
    const [products,setProducts]=useState([]);
    const [searchedProducts,setSearchProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState("");
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState();
    const [totalItems,setTotalItems]=useState();
    const [searchTerm,setSearchTerm]=useState('');
    const router = useRouter();
    
    
    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/products?search=${input}&page=${page}`,{
                    method:"GET",
                    headers:{"content-Type":"application/json"}
                });
                const result  = await res.json();
                setProducts(result.products||[]);
            }catch(e){
                
            }finally{
                setLoading(false);
            }
        }
        fetchdata();
    },[]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await fetch(`/api/products?search=${searchTerm}&page=${page}`,{
                method:"GET",
                headers:{"content-Type":"application/json"}
            });
            const result = await data.json();
            setSearchProducts(result.products);
            setTotalPages(result.pagination.totalPages)
            setTotalItems(result.pagination.totalProducts);
            setLoading(false);
        }
        fetchData();
    },[searchTerm,page]);

    useEffect(()=>{
        setLoading(true);
        const delayTimer = setTimeout(()=>{
            setSearchTerm(input);
            setPage(1);
        },500);
        return ()=>clearTimeout(delayTimer);
    },[input]);

    const handelOrder = async (e:React.MouseEvent,id:any,)=>{
        e.stopPropagation();
        router.push(`/order?id=${id}`);
    };

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


    return(
        <>
        <h3 className="text-3xl text-orange-400 place-self-center mt-10 font-extrabold mb-2">Massiv Summur Sale!</h3>
        <p className="text-red/80 place-self-center text-sm">Shop the exclusive deals right now</p>
        <div className="flex justify-center items-center">
        <input type="text" onChange={(e)=>setInput(e.target.value)}
         className="border h-10 w-80 my-20 rounded-2xl px-2 text-center focus:shadow-xl hover:shadow-2xl  transition-all hover:scale-110 duration-300" placeholder="Search For Anything..."/>
        </div>
        <div className="p-4 place-items-center grow">
            {loading?
            <div className="flex justify-center bg-amber-100 w-[75%] rounded-2xl m-20 items-center h-45 font-bold">Loading...</div>
            :<div className={`${totalItems===0?"hidden":"grid"} sm:grid-cols-2 gap-10`}>{(searchedProducts.length === 0?products:searchedProducts).map((item:any)=>(
                <div key={item._id} className="place-items-center">
                    <div onClick={()=>router.push(`/products/${item._id}`)} className="p-4 py-5 bg-red-50 w-[80%] rounded-2xl shadow-2xl transition-all hover:-translate-y-1 duration-300">
                        <img src={item.image + "/300"} alt="item.image" className="text-center place-self-center transition-all hover:scale-105 duration-300 mb-3" />
                        <div className="pt-2 pl-2">
                            <div className="font-bold">Price : {`₹${item.price}`}</div>
                            <div className="font-semibold">{item.title}</div>
                            <div className="font-extralight text-sm">{item.description}</div>
                        </div>
                        <div className="text-center p-2">
                            <button className="w-full p-1 rounded-2xl mt-2 bg-yellow-200 hover:bg-yellow-400 transition-all hover:scale-95 duration-400" onClick={(e)=>handelOrder(e,item._id)}>Order now</button>
                            <button className="w-full p-1 rounded-2xl mt-2 bg-green-200 hover:bg-green-400 transition-all hover:scale-95 duration-400" onClick={(e)=>(handelAddToCart(e,item._id))}>Add to cart</button>
                            <button className="w-full p-1 rounded-2xl mt-2 bg-pink-200 hover:bg-pink-400 transition-all hover:scale-95 duration-400" onClick={(e)=>(handelAddToWishlist(e,item._id))}>Add to wishlist</button>
                        </div>
                    </div>
                </div>
            ))}</div>}
        </div>
        <div className={`${totalItems===0?"flex":"hidden"} justify-center bg-amber-100 w-[75%] rounded-2xl m-20 items-center h-45 font-bold place-self-center`}>NO PRODUCT FOUND...</div>
        <div className={`${totalItems===0?"hidden":"flex"} justify-between px-5 my-18`}>
            <button className={`${page===1?"hidden ":"flex"} bg-blue-400 hover:bg-blue-500 px-2 rounded items-center`} onClick={()=>setPage(prev=>prev-1)}>Previous</button>
            <div className="mt-5">{`Page ${page} of ${totalPages} have ${totalItems} items.`}</div>
            <button className={`${page===totalPages?"hidden ":"flex"} bg-blue-400 hover:bg-blue-500 px-2 rounded items-center`} onClick={()=>setPage(prev=>prev+1)}>Next</button>
        </div>
        </>
    )
}