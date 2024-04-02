import React from 'react';
import service from '../appwrite/config';
import { Link, useNavigate } from 'react-router-dom';
import {InputButton} from "../exports";

function PostCard({ $id,title,featuredImage,city,country}){
 
    const navigate=useNavigate()
    const handleExplore=()=>{
        navigate(`/post/${$id}`)
    }
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white
             rounded-md overflow-hidden  px-3 pt-3"> 
                <div className="w-full   justify-center mb-4">
                    <img src={`${service.getFilePreview(featuredImage)}`}  alt="img" className="w-full  h-60  sm:h-52 md:h-40 lg:h-48 rounded-md"/> 
                </div> 
                <h2 className=" text-start md:text-md   pb-2"> {title} </h2>
                <div className='flex items-center'>
                    <img src="/src/assets/location.png" alt="" className='w-5 h-5' />
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