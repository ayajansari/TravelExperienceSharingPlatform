import React, { useState } from "react";
import {  InputButton, InputField } from "../exports";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form"
import {authService} from "../exports";
import { login as authLogin} from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(){

    const [passwordVisible,setPasswordVisible]=useState(false);
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
   
    const formSubmit=async(data)=>{
        fetch("http://localhost:5173/login")
        // try{

        //     console.log("login submit working",data)
        //     const session=await authService.login(data);
        //     if(session){
        //         const userData=await authService.getCurrentUser();
        //         console.log("current user:",userData["$id"])
        //         if(userData){
        //             dispatch(authLogin(userData))
                  
        //             navigate("/")
                    
        //         }
        //     }

        // }catch(error){
        //     console.log(error.message)

        // }
        

    }
    const loginByGoogle=()=>{
        console.log("google login working")
    }
    const loginByFacebook=()=>{
        console.log("fb login working")
    }
    
    return (
        <div  className=" flex  justify-center items-center h-screen  bg-slate-100">
       

          
            <div className=" border border-r-2 rounded-lg  max-w-sm m-2 bg-white" >

            
            <div className=" flex flex-col  px-6 py-4 "> 
            
                <img src="/src/assets/Brand_name.png" className="h-12 px-16 my-4 bg-white"  alt="" />
                <p className="text-center text-black text-lg mb-2 font-semibold">Welcome Back</p>
                {/* <div className="px-2 py-2 m-2 font-semibold text-center text-lg text-white bg-[#00a6fb] rounded-sm  ">Continue with Google</div> */}
                {/* <div className="px-2 py-2 m-2 font-semibold text-center text-lg text-white bg-[#00a6fb] rounded-sm   ">Continue with Facebook</div> */}
                <InputButton className="bg-[#00a6fb] px-2 py-2 m-2 font-semibold text-center text-lg text-white  rounded-sm" content={"Continue with Google"}  onClick={loginByGoogle} />
                <InputButton className="bg-[#00a6fb] px-2 py-2 m-2 font-semibold text-center text-lg text-white  rounded-sm" content={"Continue with Facebook"} onClick={loginByFacebook} />

                
                
                <div className="flex justify-center items-center my-4">
                    <hr className="w-2/5" />
                    <p className="1/5 px-4 text-xs font-semibold">OR</p>
                    <hr className="w-2/5" />
                </div>
                <form  className="flex flex-col " onSubmit={handleSubmit(formSubmit)} > 
                    
                    {/* <input type="email" placeholder="Enter Email" className=" px-2 py-2 m-2 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm "/> */}
                    <InputField 
                        type="email"
                        placeholder="Enter Email"
                        className="px-2 py-2 m-2 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm "
                        {...register("email",{
                            required:true,
                            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />

                    <div  className="flex  px-2 m-2 border hover:border-[#1080e9]  rounded-sm">
                        <input 
                            type={passwordVisible? 'text':'password'} 
                            placeholder="Enter Password" 
                            className="w-full py-2 focus:outline-none "
                            {...register("password",{
                                required:true,
                                minLength:8
                            })}
                        />
                        <button
                            type="button"
                            className="w-8 pl-2"
                            onClick={()=> setPasswordVisible(!passwordVisible)}
                            
                            >
                            {passwordVisible ? (<img src="/src/assets/open.png" />) :(<img src="/src/assets/hide.png" />) }
                        </button>
                    </div>
                    
                    
                    <InputButton type="submit" className="bg-[#006494] px-2 py-2 m-2 font-semibold text-center text-lg text-white  rounded-sm" content="Log In" />
                    {/* <div  className="px-2 py-2 m-2 font-semibold text-lg bg-[#006494] text-white rounded-sm text-center " >Log In</div> */}
                    
                </form >
                <hr className="mx-2 mt-4 mb-4 border-[#979dac]"/>
                <p  className="text-center">Don't have an account? 
                    <Link to="/signup" className="text-[#006494] font-bold "> Signup </Link> 
                </p>
            </div>
      
            </div>
           
        </div>
    )
}
export default Login