import React from 'react';
 
function FeatureCard({
    className="",
    src="",
    label=""
}){
 
    return (
        <div className=" p-2  lg:mx-4  xsm:mx-2 mx-6  xsm:my-0 my-4 xl:w-80 lg:w-72  md:w-56 xsm:w-40    bg-white   rounded-md shadow-[0px_0px_10px_-1px_rgba(0,0,0,0.2)]" >
            <img src={`${src}`} className="w-full   rounded-md" alt="" />
            <p className=" font-semibold mt-2  text-sm md:text-base text-[#000000b5]">{label}</p>
            
        </div>
    )
}
export default FeatureCard;