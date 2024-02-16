import React, { useEffect } from "react";
import Container from "./Container";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthLayout({children}){

    const navigate=useNavigate()
    const authStatus=useSelector((state)=> state.auth.status)
    const data=useSelector((state)=> state.auth.userData)
    console.log(authStatus,"and ",data)
    
    // useEffect(()=>{
    //     if(!authStatus){
            // navigate("/")
    //     }
    // },[authStatus])

    // authStatus?
    return  (
        <Container>
            
                {children}
            
        </Container>
    )
}

export default AuthLayout