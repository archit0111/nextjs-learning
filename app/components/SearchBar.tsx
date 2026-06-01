import { useState } from "react";

export default function SearchBar(){
    return(
        <>
        <div className="flex justify-center items-center">
        <input type="text" className="border h-10 w-80 my-20 rounded-2xl px-2 text-center focus:shadow-xl hover:shadow-2xl" placeholder="Search For Anything..."/>
        </div>
        </>
    )
}