import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home(){
    const authStatus=useSelector((state)=> state.auth.status)
    const authData=useSelector((state)=>state.auth.userData)
    const [posts,setPosts]=useState([])

    useEffect(()=>{

        
        if(authStatus){
            //get all posts from db
        }
        
    })

    return authStatus? (
        <div>
            
        </div>
    ) : (
        <div className="">
            {/* main content */}
            
        

            
            <div className="w-full pt-72 pb-56 lg:pb-60 xl:pb-72  lg:bg-cover  sm:bg-center  bg-[#006494]   bg-[url('/src/assets/landing1.png')]" > 
                <div className="w-2/3 md:w-9/12 px-auto mx-auto lg:mr-auto lg:ml-40 flex flex-col lg:items-start items-center">

            
                    <h1 className="text-2xl text-center lg:text-start lg:text-4xl  lg:w-8/12  md:text-4xl md:w-8/12 sm:text-3xl sm:w-8/12  text-white font-bold">Share Your Journeys, Connect with Travelers</h1>
                    <h3 className="text-lg w-3/4 lg:text-start text-center  py-4 text-[#c5d5e1]">Discover, share, and connect with fellow travelers on our vibrant platform, </h3>
                    <div className="flex lg:justify-start justify-center pt-2 ">
                        <Link to="/login">
                            <div className={`w-24 px-3  py-2  text-lg  font-semibold  bg-white text-center text-black  rounded-sm `}  > 
                                Sign Up
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div className={`w-24 px-3 ml-4 py-2 text-lg font-semibold border border-white text-center text-white   rounded-sm `}  > 
                                Log In
                            </div>
                        </Link> 
                    </div>
                </div>
           
            </div>
            
            
            {/* features */}
            {/* experience the power of community section from learnweb3.io */}
            
            {/*testimonials  */}
            
        </div>
    )
}
export default Home