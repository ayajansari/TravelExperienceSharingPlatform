import React from 'react';
 
function TestimonialCard({
    label="",
    user=""
}){
 
    return (
        <div className="flex flex-col justify-between p-3 m-2   min-w-72 h-60 border-2 border-slate-200 hover:bg-[#00000006] rounded-md shadow-[1px_1px_10px_-1px_rgba(0,0,0,0.5)]  ">
            <p className='text-[#000000b5]  '>" {label} " </p>
            <h2 className='pt-2 border-t border-slate-300 text-end mr-4 font-semibold '>{user}</h2>
        </div>
        
    )
}
export default TestimonialCard;