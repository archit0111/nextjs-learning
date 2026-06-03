import Link from 'next/link'

export default function Nav(){
    return(
        <>
        <div className="flex justify-between mx-3 pt-3 lg:mx-5">
            <div className="text-4xl w-[25%]">StoreAtDore</div>
            <div className="text-lg gap-6 items-center flex">
                <Link href="/home" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Home</Link>
                <Link href="/cart" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Cart</Link>
                <Link href="/contact" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Contact</Link>
                <Link href="/account" className='px-2 hover:text-blue transition-all hover:scale-110 duration-75'>Account</Link>
            </div>
        </div>
        </>
    )
}