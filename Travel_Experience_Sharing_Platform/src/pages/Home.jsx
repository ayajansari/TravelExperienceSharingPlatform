import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FeatureCard,CommunityCard,TestimonialCard,PostCard,Select ,InputButton} from "../exports";
import service from "../appwrite/config";
import { get, useForm } from "react-hook-form";
import variables from "../appwrite/variables";
import { universalTutorialAuthToken as AuthToken } from "../appwrite/auth";

function Home({
    showMyPosts=false

}){
    const authStatus=useSelector((state)=> state.auth.status)
    const authData=useSelector((state)=>state.auth.userData)
    const [posts,setPosts]=useState([])
    const {register,handleSubmit,getValues,setValue} =useForm()
    const [countries,setCountries]=useState()
    const [states,setStates]=useState()
    const [cities,setCities]=useState()
    const [error,setError]=useState()


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://www.universal-tutorial.com/api/countries/", {
              headers: {
                "Authorization": `Bearer ${AuthToken}`, // Replace YOUR_ACCESS_TOKEN_HERE with your actual access token
                "Accept": "application/json"
              }
            });
            if (response.ok) {
              const data = await response.json();
              setCountries(data);

            } else {
              
              setError('API authToken is expired. ')
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData()
    },[])

    const handleCountry=async(selectedCountry)=>{
        // console.log(selectedCountry)

        try {
            const response = await fetch(`https://www.universal-tutorial.com/api/states/${selectedCountry}`, {
              headers: {
                "Authorization": `Bearer ${AuthToken}`, // Replace YOUR_ACCESS_TOKEN_HERE with your actual access token
                "Accept": "application/json"
              }
            });

            if (response.ok) {
              const data = await response.json();
              setStates(data);

            } else {
              console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleState=async(selectedState)=>{
        console.log(selectedState)
        try {
            const response = await fetch(`https://www.universal-tutorial.com/api/cities/${selectedState}`, {
              headers: {
                "Authorization": `Bearer ${AuthToken}`, // Replace YOUR_ACCESS_TOKEN_HERE with your actual access token
                "Accept": "application/json"
              }
            });

            if (response.ok) {
              const data = await response.json();
              setCities(data);
            //   console.log("cities:",data)
            } else {
              console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    
    useEffect(()=>{

            //get all posts from db
            if(showMyPosts ){
                try {
                    if(authData){
                        service.getPosts(authData.$id).then((data)=>{
                            setPosts(data.documents)

                        })
                    }
                    
                } catch (error) {
                    console.log("error at myPosts:",error.message)
                    throw error
                }
                
            }else{
                try {
                    service.getAllPosts().then((data)=>{
                        setPosts(data.documents);

                    });
                    
                } catch (error) {
                    console.log("error at getAllPosts:",error.message)
                    throw error;
                }

            }
            

    },[authStatus]) //authstatus because it may happen that authStatus has not received user data it is taking
    //time so landing page will be shown and after some time when authStatus gets values we want to rerun the useEffect 



    const searchForm=async(data)=>{
        console.log(data);
        try {
            const response=await service.getPostsFilter(data);
            if(response){
                console.log("response:",response)
                setPosts(response.documents)
            }
            
        } catch (error) {
            console.log(error.message)
            throw error
        }

    }
    return authStatus? (
        <div className=" mx-8 sm:mx-24 md:mx-20 lg:mx-28 xl:mx-36 mb-16  ">   
            
            <div  className="my-16">
                <form onSubmit={handleSubmit(searchForm)} 
                    className="flex  md:flex-row flex-col  justify-center w-full "    
                >
                    <Select 
                        name="Country"
                        objKey="country_name"       //this is same of key in countries array
                        arr={countries} 
                        onchange={(e)=> handleCountry(e.target.value)}
                        className=" md:w-full  border px-2  py-2  md:mr-1 my-1  text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                        {...register("country",{
                            required:true
                        })}    
                    />
                     <Select
                        name="State"
                        objKey="state_name"       //this is same of key in states array
                        arr={states} 
                        onchange={(e)=> handleState(e.target.value)}
                        className=" md:w-full border px-2 py-2  md:mx-1 my-1 text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                        {...register("state")} 
                    />
                    
                    <Select
                        name="City"
                        objKey="city_name"
                        arr={cities} 
                        
                        className="md:w-full border px-2 py-2 md:mx-1 my-1  text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                        {...register("city")}
                    />
                    <InputButton type="submit" content="Filter"  className="bg-[#2F87FE] hover:bg-[#0570fc] px-6 py-2  md:ml-1 my-1 text-white   rounded-sm  font-semibold text-lg w-full" />

                </form>
                
                {error && (
                <div className="text-[#00000096]">{error}</div>
            )}
            </div>

            
            <div className="flex flex-wrap justify-center  w-full   shadow-[0px_0px_70px_-20px_rgba(0,0,0,0.15)] px-6 py-6 rounded-md">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 my-3 mx-auto  w-80    text-center  hover:bg-[#F5F5F5] rounded-md' >
                        <PostCard {...post} />
                    </div>
                    
                ))}
            </div>
            
        </div>
    ) : (
        // is user is not logged-in show landing page
        <div className="">

            {/* main content */}
            <div className="w-full pt-64 pb-64    bg-cover  bg-[url('src/assets/landing4.png')] " > 
                <div className="flex flex-col w-2/3 lg:w-2/4 mx-auto">
                    <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-white text-center" >Share Your Journeys, Connect with Travelers</h1>
                    <h3 className=" text-center text-lg mt-4 mx-3/4 text-[#ffffffbb]">Discover, share and connect with fellow travelers on our vibrant platform </h3>
                    <div className="flex justify-center mt-6 ">
                        <Link to="/signup">
                            <div className={`w-24 px-3  py-2  text-lg  font-semibold  bg-[#2F87FE] hover:bg-[#006594c3] text-center text-white  rounded-sm `}  > 
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