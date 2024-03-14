import React,{useState} from "react";
import {FooterLink} from "../../exports"
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
function Footer(){

    const user=useSelector((state)=> state.auth.userData)
    const [email,setEmail]=useState()
    const handleNewsletter=()=>{
            service.newsletter(email,user.$id)
            .then((data)=>{
                console.log("user added to newletters successfully")
            })

    }

    return (
        <div className="  w-full bg-[#2f87fe]">
            <div className="flex flex-wrap md:justify-center py-6">
                <div className="flex flex-col ml-4 mr-6 p-4  ">
                    <p className="text-3xl text-white  font-bold pb-4 ">ShareExp.vercel.app</p>
                    <FooterLink label="About" />
                    <FooterLink label="Contact" />
                    <FooterLink label="Users" />
                    
                </div>
                <div className="flex flex-col ml-4 mr-6 p-4  ">
                    <p className="text-lg text-white font-semibold pb-4">Social Media</p>
                    <FooterLink label="Github" />
                    <FooterLink label="LinkedIn" />
                    
                </div>
                <div className="flex flex-col ml-4 mr-6 p-4 ">
                    <p className="text-lg text-white font-semibold pb-4">Legals</p>
                    <FooterLink label="Terms & Conditions" />
                    <FooterLink label="Privacy & Policy" />
                    <FooterLink label="Licences" />
                   
                </div> 
            </div>
            <div className="flex flex-col md:items-center items-start py-8 px-8 md:m-4  " >
                <h1 className="text-white  font-semibold text-lg">Subscribe to our Newsletter</h1>
                <p className="text-[#ffffff95] mt-1 mb-1 ">The latest news, articles, and resources, sent to your inbox weekly.</p>
                <div className="" >
                    <input 
                        type="email" 
                        placeholder="Your email address..." 
                        onChange={(e)=> setEmail(e.target.value)}  
                        className="focus:outline-none py-2 px-3  mr-4 my-1 rounded-md w-72" 
                    />
                    <input 
                        type="button" 
                        value="Subscribe"   
                        onClick={handleNewsletter}
                        className= "text-[#2f87fe] hover:cursor-pointer font-bold bg-white py-2 px-4 rounded-md" />
                </div>
            </div>

            <p className="w-full  text-xs text-white bg-[#2f87fe]  p-2 ">Copyright © 2023-2024 ShareExp Company India. All rights reserved.</p>

        </div>
        
    )
}

export default Footer