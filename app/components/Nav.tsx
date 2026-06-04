"use client"
import Link from 'next/link'
import { useState } from 'react'

export default function Nav(){
    const [links,setLinks]=useState(false);
    return(
        <>
        <div className="flex justify-between mx-3 pt-3 px-4 lg:mx-5">
            <div className="text-4xl w-[25%]">StoreAtDoor</div>
            <div className="text-lg gap-6 items-center md:flex hidden">
                <Link href="/home" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Home</Link>
                <Link href="/cart" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Cart</Link>
                <Link href="/wishlist" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Wishlist</Link>
                <Link href="/account" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Account</Link>
            </div>
            <div className={`${links?'md:hidden hidden':"md:hidden"}`}><button onClick={()=>setLinks(prev=>!prev)}>&#9776;</button></div>
            <div className={`${links?"text-lg gap-4 items-center grid grid-cols-1 md:hidden":"hidden"}`}>
                <Link href="/" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75' onClick={()=>setLinks(prev=>!prev)}>Home</Link>
                <Link href="/cart" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75' onClick={()=>setLinks(prev=>!prev)}>Cart</Link>
                <Link href="/wishlist" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75' onClick={()=>setLinks(prev=>!prev)}>Wishlist</Link>
                <Link href="/account" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75' onClick={()=>setLinks(prev=>!prev)}>Account</Link>
            </div>
        </div>
        </>
    )
}