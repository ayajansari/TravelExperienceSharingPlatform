import React from 'react';
 
function TestimonialCard({
    label="",
    user=""
}){
 
    return (
        <div className="flex flex-col justify-between p-3 m-2   min-w-72 h-68 border font-semibold border-blue-200  rounded-md   ">
            <img src="double-quotes.png" className='w-12' alt="" />
            <p className='text-[#000000b5]  '> {label}  </p>
            <h2 className='pt-2   text-[#2f87fe] text-end mr-4 font-semibold '>{user}</h2>
        </div>
        
    )
}
export default TestimonialCard;