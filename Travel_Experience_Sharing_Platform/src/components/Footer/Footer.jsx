import React from "react";
import {FooterLink} from "../../exports"

function Footer(){


    return (
        <div className="  w-full bg-[#006494]">
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
            <div className="flex flex-col md:items-center items-start py-12 px-8 md:m-4  " >
                <h1 className="text-white  font-semibold text-lg">Subscribe to our Newsletter</h1>
                <p className="text-[#ffffff95] mt-1 mb-1 ">The latest news, articles, and resources, sent to your inbox weekly.</p>
                <div className="" >
                    <input type="text" placeholder="Enter your Email" className="py-2 px-3  mr-4 my-1 rounded-md w-56" />
                    <input type="button" value="Subscribe" className= "text-[#006494] bg-white   font-semibold   py-2 px-3 rounded-md" />
                </div>
            </div>

            <p className="w-full bg-white text-sm text-[#006494]  p-2 text-center">Copyright © 2023-2024 ShareExp Company India. All rights reserved.</p>

        </div>
        
    )
}

export default Footer