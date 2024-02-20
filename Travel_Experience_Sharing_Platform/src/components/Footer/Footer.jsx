import React from "react";
import {FooterLink} from "../../exports"

function Footer(){


    return (
        <div className="  w-full bg-[#006494]">
            <div className="flex flex-wrap md:justify-center py-6">
                <div className="flex flex-col ml-4 mr-6 p-4  ">
                    <p className="text-xl text-white font-bold pb-4 ">ShareExp.vercel.app</p>
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

            <p className="w-full bg-[#006494] text-xs text-white pb-4 text-center">Copyright © 2023-2024 ShareExp Company India. All rights reserved.</p>

        </div>
        
    )
}

export default Footer