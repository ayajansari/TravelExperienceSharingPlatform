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
            
        

            
            <div className="w-full pt-64 pb-64    bg-sky-100 bg-cover  bg-[url('src/assets/landing4.png')] " > 
                <div className="flex flex-col w-2/3 lg:w-2/4 mx-auto">

            
                    <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-white text-center" >Share Your Journeys, Connect with Travelers</h1>
                    <h3 className=" text-center text-lg mt-4 mx-3/4 text-slate-300">Discover, share, and connect with fellow travelers on our vibrant platform. </h3>
                    <div className="flex justify-center mt-6 ">
                        <Link to="/login">
                            <div className={`w-24 px-3  py-2  text-lg  font-semibold  bg-[#006494] hover:bg-[#006594c3] text-center text-white  rounded-sm `}  > 
                                Sign Up
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div className={`w-24 px-3 ml-4 py-2 text-lg font-semibold border border-[#006494] text-center text-[#006494]   rounded-sm `}  > 
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