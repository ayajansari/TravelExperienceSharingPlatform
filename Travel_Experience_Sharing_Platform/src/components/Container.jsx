import React, { useEffect } from "react";

import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Container({children}){

    // const navigate=useNavigate()
    // const authStatus=useSelector((state)=> state.auth.status)
    // const data=useSelector((state)=> state.auth.userData)
    // console.log(authStatus,"and ",data)
    

 
    return  (
        <div>
            {children}
        </div>
    )
}

export default Container