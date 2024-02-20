import React from 'react';
 
function CommunityCard({
    value="",
    lable=""
}){
 
    return (
        <div className="px-4 lg:px-8 py-4 border bg-[#00000006] xsm:my-2 my-0  ">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5f8fc7] to-[#ba189f] ">{value}</h1>
            <h3 className="text-md font-semibold text-[#00000098] ">{lable}</h3>
        </div>
    )
}
export default CommunityCard;