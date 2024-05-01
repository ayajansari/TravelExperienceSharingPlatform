import React,{ useState } from "react";
import { InputButton, InputField } from "../exports";
import { Link } from "react-router-dom";
import { useForm} from "react-hook-form"
import {authService} from "../exports";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"


function Signup(){

    const [passwordVisible,setPasswordVisible]=useState(false);
    const {register,handleSubmit}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [error,setError]=useState("");

    const formSubmit=async(data)=>{

        try {
            const userSignedUp=await authService.signup(data);
            if(userSignedUp){
                const userData=await authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData))
                    navigate("/")
                    
                }
            }
        } catch (error) {
            setError(error.message)
        }
     
        
       

    }

    return (
        <div  className=" flex  justify-center items-center h-screen  bg-slate-100">

            <div className=" border border-r-2 rounded-lg  max-w-sm m-2 bg-white" >
                <div className=" flex flex-col  px-6 py-4 "> 
                
                    <img src="Brand_name.png" className="h-12 px-16 my-4 bg-white"  alt="" />
                    <p className="text-center text-black text-lg mb-2 font-semibold">Sign Up</p> 
                    {error && (<p className="text-center text-red-800 text-sm mb-2 ">{error}</p>  )}         
                    
                    <form  className="flex flex-col " onSubmit={handleSubmit(formSubmit)}> 

                        {/* <input type="text" placeholder="Enter Name" className="px-2 py-2 m-2 border hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm  " />
                        <input type="email" placeholder="Enter Email" className="px-2 py-2 m-2 border  hover:border-[#1080e9] focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm "/> */}
                        <InputField 
                            type="text"
                            placeholder="Enter Full Name"
                            className="px-2 py-2 m-2 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm "
                            {...register("name",{
                                required:true
                            })}
                        />
                        <InputField 
                            type="email"
                            placeholder="Enter Email" 
                            className="px-2 py-2 m-2 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm "
                            {...register("email",{
                                required:true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

                            })}    
                        />

                        <div  className="flex  px-2 m-2 border hover:border-[#1080e9]  rounded-sm">
                            <input 
                                type={passwordVisible? 'text':'password'} 
                                placeholder="Enter Password" 
                                className="w-full py-2 focus:outline-none"
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
                        
                        <div className="flex  px-2 py-3 m-2 "> 
                            <input 
                                type="checkbox" 
                                name="check" 
                                id="check" 
                                className="mb-4  "
                                required
                            /> 
                            <p className="ml-2 text-sm"> I agree to the all User agreements & Privacy Policy.</p>
                        </div>
                        <InputButton type="submit" content="Submit"  className="px-2 py-2 m-2 font-semibold text-lg bg-[#006494] text-white rounded-sm " />
                        
                    
                    </form >

                    <hr className="mx-2 mt-4 mb-4 border-[#979dac]"/>
                    <p  className="text-center">Already have an account? 
                        <Link to="/login" className="text-[#006494] font-bold "> Login </Link> 
                    </p>
                </div>
            </div>
           
        </div>
    )
}
export default Signup