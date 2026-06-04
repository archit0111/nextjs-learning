"use client"
import { useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();

    const loginUser=async(e:any)=>{
        e.preventDefault();
        const user = {
            email:email,
            password:password
        }
        try{
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{'content-Type':'application/json'},
                body:JSON.stringify(user)
            });
            if (!res.ok) {
    const rawHTML = await res.text();
    console.error("CRITICAL BACKEND ERROR:", rawHTML);
    alert(`Server Error Status: ${res.status}. Press F12, open the console tab, and look at 'CRITICAL BACKEND ERROR' to see what broke!`);
    return;
}
            const data = await res.json();
            if(data.success){
                alert(data.message);
                router.push("/");
            }else{
                alert(data.message);
            }
        }catch(e){
            alert(`Some error occred in login: ${e}`);
        }
    }


    return(
        <>
        <div className="flex justify-between mx-3 pt-3 px-4 lg:mx-5">
            <div className="text-4xl w-[25%]">StoreAtDoor</div>
            <div className="text-lg gap-6 items-center flex">
                <div className="font-xl">Login</div>
            </div>
        </div>
        <div className="mt-5 grow w-[75%] content-center self-center">
            <div className="h-fit p-5 rounded-2xl bg-olive-300">
                <div className="bg-olive-400 rounded-2xl h-10 flex justify-center items-center font-bold text-2xl mb-5">Login</div>
                <form>
                    <div className="flex w-full items-center gap-4 place-content-center mt-10 mb-4">
                        <label htmlFor="email" className="text-xl">Email:</label>
                        <input type="email" className="border p-1 px-1 ml-2 rounded" placeholder="example@gmail.com" onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="flex w-full items-center gap-4 place-content-center mb-4">
                        <label htmlFor="password" className="text-xl">Password:</label>
                        <input type="password" className="border p-1 px-1 ml-2 rounded" placeholder="Enter you password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="text-center"><button className="bg-green-400 hover:bg-green-500 p-1 md:w-[40%] w-[75%] rounded-xl transition-all mt-10 mb-4 focus:scale-95" onClick={(e)=>loginUser(e)}>Login</button>
                    <p className="font-extralight">New user? <Link href={"/signup"} className="text-blue-800 hover:font-bold">SignUp</Link></p>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}