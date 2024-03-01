import React, { useEffect } from "react";

import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Container({children}){

    // const navigate=useNavigate()
    // const authStatus=useSelector((state)=> state.auth.status)
    // const data=useSelector((state)=> state.auth.userData)
    // console.log(authStatus,"and ",data)
    

 
    return  (
        <div className="w-full bg-slate-50 ">
            {children}
        </div>
    )
}

export default Container