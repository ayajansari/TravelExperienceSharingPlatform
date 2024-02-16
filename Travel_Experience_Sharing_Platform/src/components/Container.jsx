import React from "react";

function Container({
    children,
    className=""
}){


    return (
        <div className={`w-full  h-screen mx-auto  bg-slate-50  ${className}`}>
            {children}
        </div>
    )
}
export default Container