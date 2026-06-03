"use client"
import { useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Signup(){
    const [user,setUser]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    return(
        <>
        <div className="flex justify-between mx-3 pt-3 px-4 lg:mx-5">
            <div className="text-4xl w-[25%]">StoreAtDoor</div>
            <div className="text-lg gap-6 items-center flex">
                <div className="font-xl">Signup</div>
            </div>
        </div>
        <div className="mt-5 grow w-[75%] content-center self-center">
            <div className="h-fit p-5 rounded-2xl bg-olive-300">
                <div className="bg-olive-400 rounded-2xl h-10 flex justify-center items-center font-bold text-2xl mb-5">SignUp</div>
                <form>
                    <div className="flex w-full items-center gap-4 place-content-center mt-10 mb-4">
                        <label htmlFor="email" className="text-xl">Email:</label>
                        <input type="email" className="border p-1 px-1 ml-2 rounded" placeholder="example@gmail.com" />
                    </div>
                    <div className="flex w-full items-center gap-4 place-content-center mb-4">
                        <label htmlFor="password" className="text-xl">Password:</label>
                        <input type="password" className="border p-1 px-1 ml-2 rounded" placeholder="Enter you password" />
                    </div>
                    <div className="text-center"><button className="bg-green-400 hover:bg-green-500 p-1 w-[75%] rounded-xl transition-all mt-8 mb-4 focus:scale-95">SignUp</button>
                    <p className="font-extralight">Already have account? <Link href={"/login"} className="text-blue-800 hover:font-bold">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    )
}