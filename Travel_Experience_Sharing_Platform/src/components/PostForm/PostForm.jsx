import React, { useState } from "react";
import {InputButton, InputField,RTE,Select} from "../../exports"
import {get, useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import {useEffect, useCallback } from "react";
import variables from "../../appwrite/variables";
import { universalTutorialAuthToken as AuthToken } from "../../appwrite/auth";

function PostForm({post}){

    const { register,control, handleSubmit,  setValue,  getValues } = useForm({
        defaultValues: {    
            title: post?.title || "",
            country:post?.country || "",
            state:post?.state || "",
            city:post?.city || "",
            slug: post?.$id || "",     
            content: post?.content || "",
            status:post?.status || ""
            
        },
    });
    

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error,setError]=useState("")
    const [imageUrl,setImageUrl]=useState()
    const [countries,setCountries]=useState()
    const [states,setStates]=useState()
    const [cities,setCities]=useState()


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
              console.log("countries:",data)
            } else {
              console.error('Failed to fetch data');
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
              console.log("state:",data)
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
              console.log("cities:",data)
            } else {
              console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useCallback(()=>{
        appwriteService.getFilePreview(post.featuredImage).then((url)=>{
            setImageUrl(url);
            console.log("received url:",url)
        })

    },[])
    
    const formSubmit = async (data) => {    //data is the entire data of form 

        // console.log(data.content.length)
        if(data.content.length>1000){
            setError("Length of post content should be less than 1000 characters")
            return 
        }

        if (post) {     //edit post

            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;    //upload the updated image
                console.log("file uploaded",file)
                if (file) {
                    appwriteService.deleteFile(post.featuredImage); //delete previous image
                }
                console.log("author name",userData.name)
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    author:userData.name,
                    featuredImage: file ? file.$id : undefined,
                });

                

                if (dbPost) {

                    navigate(`/post/${dbPost.$id}`);
                }
                
            } catch (error) {
                console.log(error.message)
                
                throw error
            }
            
        } else {    //add-post
               
            
            try {
                const file = await appwriteService.uploadFile(data.image[0]);//to get imageID
                console.log("file uploaded",file)
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            } catch (error) {
                setError("size of image should be less than 1MB")
                console.log(error)
            }
            
        }
    };

    const handleCancle=()=>{
        navigate("/")
    }

    const slugTransform = useCallback((value) => {
        if (value ){
            
            return value
                .trim() //remove white spaces
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);




    return (
        <div className="bg-slate-100 w-full px-8 py-16   ">
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col justify-center items-center mx-0 xsm:mx-4 sm:mx-12  lg:mx-40 xl:mx-60 border  rounded-lg overflow-hidden">
                <h1 className="w-full  bg-[#2f87fe] text-white font-semibold text-lg py-3 text-center">Create New Post</h1>
                <div className=" bg-white  w-full py-8 px-6 md:px-12  lg:px-20   "> 
                    
                    <div className="flex flex-col">
                        <InputField 
                            type="type"
                            
                            placeholder="Title of your Post"
                            onInput={(e)=> setValue("slug", slugTransform(e.target.value))} 
                            className=" py-2 px-4 my-2 border focus:outline-none focus:border-[#006494] rounded-sm"
                            {...register("title",{
                                required:true
                            })}
                        
                        />

                        <div className="flex md:flex-row flex-col md:justify-between   ">
                            
                            <Select 
                                name="Country"
                                objKey="country_name"
                                arr={countries}  
                                onchange={(e)=> handleCountry(e.target.value)}
                                className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                {...register("country",{
                                    required:true
                                })} 
                            />
                            <Select 
                                name="State"
                                objKey="state_name"
                                arr={states}  
                                onchange={(e)=> handleState(e.target.value)}
                                className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                {...register("state",{
                                    required:true
                                })}
                            />
                            <Select 
                                name="City"
                                arr={cities}  
                                objKey="city_name"
                                className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 my-2 text-[#00000096] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                {...register("city",{
                                    required:true
                                })} 
                            />

                        </div>

                        <RTE control={control} defaultValue={getValues("content")}  />
                        
                        <div className="flex mt-4">
                            {/* <input type="file" name="postImage" id="" className="py-4 w-60  "
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image",{
                                    required:!post
                                })} 

                            /> */}

                            <input type="file" class="block w-full file:hover:cursor-pointer text-sm text-slate-500
                                file:mr-4 file:py-2.5 file:px-4
                                file:rounded-sm file:border-0
                                 file:font-semibold
                                file:bg-[#2f89fe11] file:text-[#2f87fe]
                                hover:file:bg-[#2f89fe1f]"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image",{
                                    required:!post
                                })}
                            />
                            
                            {imageUrl && (
                                <div className="w-32 mb-4 mr-6">
                                    <img
                                        src={ imageUrl}
                                        alt="img"
                                        className="rounded-lg "
                                    />
                                </div>
                            )}
                            <Select 
                                name="Status"
                                objKey="status_type"
                                arr={[{"status_type":"Active"},{"status_type":"Inactive"}]}  
                                className="w-w-40 sm:w-60 md:w-80 border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2  text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                {...register("status",{
                                    required:true
                                })} 
                            />

                           
                            
                        </div>
                        

                        

                        <hr className="border-t border-t-slate-200 mt-6" />
                        <p className="text-[#00000054] text-sm">You can always edit this information from My Posts section.</p>
                        <div className="mt-12 mb-6 flex justify-evenly">
                            
                            <InputButton type="submit" content="Save"  className="bg-[#2f87fe] hover:bg-[#0570fc] px-12 text-white py-2 rounded-sm text-lg font-semibold " />

                            <InputButton 
                                content="Cancel" 
                                className="border border-red-400 text-red-400 bg-white hover:bg-red-400 hover:text-white px-12 py-2 rounded-sm text-lg font-semibold "
                                onClick={handleCancle}
                            />
                            
                        </div>
                    </div>
                    {error && (
                        <div className="text-slate-400">
                            {error}
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}
export default PostForm