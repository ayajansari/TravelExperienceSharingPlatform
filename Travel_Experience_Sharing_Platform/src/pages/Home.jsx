import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FeatureCard,CommunityCard,TestimonialCard } from "../exports";


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
            <div className="w-full pt-64 pb-64    bg-cover  bg-[url('src/assets/landing4.png')] " > 
                <div className="flex flex-col w-2/3 lg:w-2/4 mx-auto">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-white text-center" >Share Your Journeys, Connect with Travelers</h1>
                    <h3 className=" text-center text-lg mt-4 mx-3/4 text-[#ffffffbb]">Discover, share and connect with fellow travelers on our vibrant platform </h3>
                    <div className="flex justify-center mt-6 ">
                        <Link to="/signup">
                            <div className={`w-24 px-3  py-2  text-lg  font-semibold  bg-[#006494] hover:bg-[#006594c3] text-center text-white  rounded-sm `}  > 
                                Sign Up
                            </div>
                        </Link>
                        <Link to="/login">
                            <div className={`w-24 px-3 ml-4 py-2 text-lg font-semibold text-center  text-white border border-white hover:text-[#ffffff9b] hover:border-[#ffffff9b]  rounded-sm `}  > 
                                Log In
                            </div>
                        </Link> 
                    </div>
                </div>
            </div>
            
            {/* experience the power of community section  */}
            <div className="flex flex-col text-center justify-center w-full mt-16  ">
                <p className="mx-6 text-3xl font-semibold">Experience the power of Community</p>
                <p className="w-2/3 mx-auto pt-2 text-[#000000b5] text-lg">Discover the magic of travel through authentic stories and experiences </p>
                <div className="flex xsm:flex-row flex-col justify-center  md:mx-32 xsm:mx-8 mx-6 my-4">
                    <CommunityCard value="999K+" lable="Modules to learn" />
                    <CommunityCard value="99K+" lable="Active Travelers" />
                    <CommunityCard value="199+" lable="Country Experiences" />      
                </div>         
            </div>

            {/* features section */}
            <div className="w-full bg-white mt-8">
                <p className="mx-6 text-3xl text-center font-semibold">Explore our platform's key features</p>
                <div className="w-full pt-8 pb-16 flex xsm:flex-row flex-col justify-center   text-center  "> 
                    <FeatureCard src="/src/assets/feature1.png" label="Share your Travel Experience with others" />
                    <FeatureCard src="/src/assets/feature2.jpg" label="Know more about your Destination" />
                    <FeatureCard src="/src/assets/feature3.jpg" label="Search Experiences across the world" />         
                </div>
            </div>

            {/*testimonials  */}
            <div className="">
                <div className="">
                    <p className="mx-6 text-3xl text-center font-semibold">Loved by users worldwide</p>
                    <p className="w-2/3 mx-auto pt-2 text-center text-[#000000b5] text-lg">Discover What Others Have Experienced </p>
                </div>
                
                <div id="custom-ScrollBar" className="  flex   overflow-x-scroll   flex-nowrap mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-28 mt-6 mb-20 bg-[#ffffff8e]">
                    <TestimonialCard 
                        label="I've been a part of this amazing travel community for years, and it never fails to inspire me. From hidden gems to insider tips, I've discovered countless treasures thanks to the shared experiences of fellow travelers."
                        user="- Raj S"
                    />
                    <TestimonialCard 
                        label="As a solo traveler, finding a supportive community like this has been a game-changer. I've made lifelong friends, received invaluable advice, and felt empowered to explore the world fearlessly."
                        user="- Alex R"
                    />
                    <TestimonialCard 
                        label="I stumbled upon this platform while planning my first backpacking trip, and I'm so glad I did."
                        user="- Sarah M"
                    />
                    <TestimonialCard 
                        label="Being a part of this community has reignited my passion for travel and opened my eyes to new possibilities. "
                        user="- Ayaj A"
                    />
                    <TestimonialCard 
                        label="This platform has been a lifeline for me during the pandemic, allowing me to stay connected with the travel community and dream about future adventures."
                        user="- Maria S"
                    />
                    <TestimonialCard 
                        label="I've been a part of this amazing travel community for years, and it never fails to inspire me. From hidden gems to insider tips, I've discovered countless treasures thanks to the shared experiences of fellow travelers."
                        user="- Gaurav S"
                    />
                </div>
            </div>    
        </div>
    )
}
export default Home