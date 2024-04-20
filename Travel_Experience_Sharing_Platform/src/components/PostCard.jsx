import React, { useState } from 'react';
import service from '../appwrite/config';
import { Link, useNavigate } from 'react-router-dom';
import {InputButton} from "../exports";
import appwriteService from "../appwrite/config"
import { useEffect } from 'react';

function PostCard({ $id,title,featuredImage,city,country}){
 
    const [imageUrl,setImageUrl]=useState('')
    const navigate=useNavigate()
    const handleExplore=()=>{
        navigate(`/post/${$id}`)
    }

    useEffect(() => {
        const fetchImagePreview = async () => {
            try {
                // if(featuredImage){

                
                    const filePreview =await  appwriteService.getFilePreview(featuredImage);
                    console.log("i am getting",filePreview)
                    setImageUrl(filePreview);
                // }
            } catch (error) {
                console.error('Error fetching image preview:', error);
            }
        };

        fetchImagePreview();
    }, [featuredImage]); // Run this effect only once, on component mount



    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white border border-slate-300
             rounded-md overflow-hidden  px-3 pt-3"> 
                <div className="w-full   justify-center mb-4">

                    {imageUrl ? (

                        <img src={imageUrl} alt="File Preview" className="w-full  h-52  sm:h-44 md:h-48  rounded-md" />

                    ) : (

                        <p>Loading...</p>
                    )}

                </div> 
                <h2 className=" text-start md:text-md   pb-2"> {title} </h2>
                <div className='flex items-center'>
                    <img src="/src/assets/gps.png" alt="" className='w-8' />
                    <p className='pl-2'>{city+","+country}</p>
                </div>
                
                <InputButton   
                    content="Explore" 
                    className='w-full  py-2 my-6 font-semibold text-lg rounded-md   text-[#2f87fe] bg-white border border-[#2f87fe] hover:bg-[#2F87FE] hover:text-white ' 
                    onClick={handleExplore}  
                />         
            </div>    
        </Link>
    )
}
export default PostCard;