import React, { useState, useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel.jsx'
import Autoplay from "embla-carousel-autoplay"
import { AppContext } from '@/context/AppContext';

// array to render the images directly instead of manually creating multiple img tags in carousel
const companyLogos = [
    assets.amazon_logo, 
    assets.microsoft_logo, 
    assets.accenture_logo, 
    assets.samsung_logo, 
    assets.adobe_logo, 
    assets.walmart_logo, 
    assets.instagram_logo, 
    assets.netflix_logo, 
    assets.facebook_logo, 
    assets.meta_logo,
];

const Hero = () => {

    // state variables to store the data after clicking on input fields of profile n location 

    // stores search criteria and toggles whether search is active
    const { setSearchFilter, setIsSearched } = useContext(AppContext);
    
    // to directly access input value from dom
    const titleRef = useRef(null);
    const locationRef = useRef(null);

    // state variable to toggle cross icon visibility
    const [showClear, setShowClear] = useState(false);

    // Search Handler
    const onSearch = () => {
        const title = titleRef.current.value.trim();
        const location = locationRef.current.value.trim();
    
        setSearchFilter({ title, location });
        setIsSearched(true);
        
        // if any input is filled show clear icon
        if (title || location) {
            setShowClear(true);
        }
    };    

    // Function to clear input fields and hide cross
    const onClear = () => {
        // reset both input fields
        titleRef.current.value = "";
        locationRef.current.value = "";
        setSearchFilter({ title: "", location: "" });
        setIsSearched(false);
        setShowClear(false);
    };

    return (
        <div className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>

            <div className='text-center'>
                <h1 className='flex flex-col items-center justify-center text-4xl sm:text-6xl lg:text-8xl font-extrabold py-1 tracking-tight'>Find Your Dream Job <span>and get hired</span></h1>
                <p className='text-gray-400 mt-6 lg:mt-12  text-xs sm:text-xl '>Explore thousands of job listing or find the perfect candidate</p>
                <div className='flex items-center justify-between mt-12 border border-gray-300 rounded-full px-4 py-3 gap-2 mx-auto w-full max-w-sm sm:max-w-3xl bg-white/60 backdrop-blur-md shadow-lg'>
                    <div className='flex items-center pl-4'>
                        <img className='h-5 sm:h-6' src={assets.search_icon} alt="" />
                        <input className='max-sm:text-xs p-2 outline-none focus:outline-none w-full' type="text" placeholder='Profile' ref={titleRef} />
                    </div>
                    <div className='flex items-center'>
                        <img className='h-5 sm:h-6' src={assets.location_icon} alt="" />
                        <input className='max-sm:text-xs p-2 outline-none focus:outline-none w-full' type="text" placeholder='location' ref={locationRef} />
                    </div>
                    <button onClick={onSearch} className='bg-emerald-500 text-white px-6 sm:px-9 py-2 rounded-full'>Search</button>
                    {showClear && (
                        <img onClick={onClear} className='h-3 sm:h-3 cursor-pointer' src={assets.cross_icon} alt="" />
                    )}
                </div>
            </div>


            <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-3 px-17">
                <CarouselContent className="flex gap-5 sm:gap-8 items-center">
                    {companyLogos.map((logo, index) => (
                        <CarouselItem key={index} className="basis-1/3 lg:basis-1/6">
                            <img className='h-9 sm:h-10 object-contain' src={logo} alt="company-logo" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

        </div>
    )
}

export default Hero
