import React from "react";
import { authService } from "../../exports";
import { logout } from "../../store/authSlice";
import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout({
    className=""
}){

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleLogout=()=>{
        
        const logoutDone=authService.logout()
        if(logoutDone){
            dispatch(logout())
            navigate("/")
        }
    }

    return (
        <div className={`   ${className}`}  onClick={handleLogout}>
           Logout
        </div>
    )
}

export default Logout