"use client";
import Slider from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const carousel = ['/ts-1.webp','/shoe-1.webp','/cap-1.webp','/headphone-1.webp'];

const settings = {
    dots : true,
    arrows : true,
    infinite : true,
    speed : 500,
    slidesToShow : 3,
    slidesToScroll : 1,
    autoplay : true,
    autoplaySpeed : 2000,
    centerMode : true
}


export default function Carousel(){
    return(
        <>
        <Slider {...settings}>
        {carousel.map((item,index)=>(
            <div className="p-2" key={index}>
                <div className='h-10 flex p-2 items-center justify-center'><div>{item}</div></div>
            </div>
        ))}
        </Slider>
        </>
    )
    
}