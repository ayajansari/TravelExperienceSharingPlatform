import React, { useState } from "react";
import { Link } from "react-router-dom";

import {Logo,Logout} from "../../exports";
import { useSelector } from "react-redux";

function Header(){
    const authStatus=useSelector((state)=>state.auth.status)
    const [showMenu,setshowMenu]=useState(false)
    const [showProfile,setShowProfile]=useState(false)
  
    const navItems=[ 
        
        {
            name:"Home",
            slug:"/",
            active:true,
            img:"src/assets/home2.png"     
        },
        {
            name:"Login",
            slug:"/login",
            active:!authStatus,
            img:"/src/assets/user-login.png"
        },
        {
            name:"Signup",
            slug:"/signup",
            active:!authStatus,
            img:"/src/assets/signup.png"
        },
        {
            name:"Search",
            slug:"/search",
            active:authStatus,
            img:"/src/assets/search.png"
        },
        {
            name:"My Posts",
            slug:"/my-posts",
            active:authStatus,
            img:"/src/assets/list.png"
        },
        {
            name:"Add Post",
            slug:"/add-post",
            active:authStatus,
            img:"/src/assets/add-post.png"
        }
    ]

    return (
        
        <div className="sticky top-0 bg-white">
            <div className={`   w-full  border-b-2  border-b-[#e8f1f2] `} >

                {/* nav-bar */}
                <nav className="flex justify-between md:px-2 px-4">  

                    {/* menu button */}
                    <div 
                        className=" md:hidden inline-block my-2 border-2 border-[#006494]" 
                        onClick={()=>setshowMenu(!showMenu)}   
                    >
                        <img src="/src/assets/menu-bar.png" className="w-10" alt="" />
                    </div>
                    
                    {/* logo */}
                    <div className="md:mr-auto md:ml-2  "  >
                        <Link to="/"> <Logo/> </Link>
                    </div> 

                    {/* nav-links */}
                    <div className="md:inline-block hidden">
                        <ul className="flex ml-auto   ">
                            {navItems.map((item)=> item.active? (
                                <Link to={`${item.slug}`}>
                                    <li className={`px-4  py-2 mx-1 mb-2 mt-3  flex  font-semibold bg-white text-[#00000096] hover:text-white hover:bg-[#006494]  rounded-sm `} key={item.slug} > 
                                        {item.name}
                                    </li>
                                </Link>  
                            ) : null)}
                            </ul> 
                    </div>

                    {/* theme-change button and profile button  */}
                    <div className="flex">
                        <div className="px-2 py-2 mb-2 mt-3 rounded-sm mr-2  md:ml-1  md:mr-1 md:inline-block  hover:bg-slate-100 " >
                            <img src="/src/assets/night-mode.png" className="w-6" alt="" />
                        </div>
                        {authStatus && (
                            <div 
                                className="px-4 py-2 mb-2 mt-3 rounded-sm  md:ml-2  md:mr-3 shadow-md  bg-[#006494] text-white " 
                                onClick={()=>setShowProfile(!showProfile)}
                            >
                                <span className="">AJ</span>

                                {/* show profile section when click of profile icon */}
                                {showProfile && (
                                    <div className="absolute top-14 right-4 flex flex-col mt-2  bg-white rounded-md  shadow-2xl" >

                                        <div className="flex items-center px-4 py-3 border-b-2 border-b-[#d5dde1]">
                                            <img src="/src/assets/user.png" className="pr-4 "  alt="" />
                                            <span className="inline-block text-[#006494] text-md font-semibold">Mohammad Ayaj</span>
                                        </div>

                                        <Link to={"/dashboard"}>
                                            <div className="flex items-center  text-black text-md  ">
                                                {/* <img src="/src/assets/pencil.png" className="w-6 pl-2" alt="" /> */}
                                                <span className=" w-full pl-4  ml-4 my-3  hover:border-l-4 hover:border-[#006494] hover:text-[#006494] hover:font-semibold">My Dashboard </span>
                                            </div>
                                        </Link>
                                        <Link to={"/edit"}>
                                            <div className="flex items-center  text-black text-md  ">
                                                {/* <img src="/src/assets/pencil.png" className="w-6 pl-2" alt="" /> */}
                                                <span className="w-full pl-4 ml-4 my-3 hover:border-l-4 hover:border-[#006494] hover:text-[#006494] hover:font-semibold">Edit Profile </span>
                                            </div>
                                        </Link>
                                        <Link to={"/settings"}>
                                            <div className="flex items-center  text-black text-md  ">
                                                {/* <img src="/src/assets/pencil.png" className="w-6 pl-2" alt="" /> */}
                                                <span className="w-full  pl-4  ml-4 mt-2 mb-3 hover:border-l-4 hover:border-[#006494] hover:text-[#006494] hover:font-semibold">Account Settings</span>
                                            </div>
                                        </Link>
                                        
                                        <div className=" rounded-bl-lg rounded-br-lg cursor-pointer" >
                                            <hr className="w-full border-b-2 border-b-[#d5dde1] " />
                                            <div className="flex items-center  text-black text-md  ">
                                                {/* <img src="/src/assets/turn-off.png" className="w-6 pl-1 " alt="" /> */}
                                                <Logout className="w-full pl-4 mx-4 my-3 hover:border-l-4 hover:border-[#006494] hover:text-[#006494] hover:font-semibold" />
                                            </div>  
                                        </div>
                                        
                                    </div>
                                )}
                                
                            </div>
                        )}
                    </div>     

                </nav>    
            </div>

            {/* show side panel when clicked on menu bar */}
            {showMenu && (
                <div 
                    className="  w-full absolute top-0 left-0 backdrop-blur-sm bg-[#006494]/30 z-50"
                    onClick={()=>setshowMenu(!showMenu)}
                >
                    <div className="  w-72 h-screen   bg-[#006494] px-3">
                    <div className="w-full " onClick={()=>setshowMenu(!showMenu)} > <img src="/src/assets/close.png" alt="X" className="w-4 ml-auto mr-2 pt-4  " /></div>
                        
                        <div className="flex flex-col   ">
                            {navItems.map((item)=> item.active? (
                                <Link to={`${item.slug}`}>   
                                    <div className={`px-4 py-2 ml-2 mr-12 mb-2 mt-3 flex font-semibold  text-white hover:border-white hover:border  rounded-sm `}
                                        onClick={()=>setshowMenu(!showMenu)}     
                                    >   
                                        <img src={item.img} className="w-6 " alt="" />
                                        <p className="pl-4">{item.name}</p>    
                                    </div>
                                </Link>   
                            ) : null)}


                        </div>
                        
                    </div>
                </div>
            )}

        </div>
       
    )
}

export default Header