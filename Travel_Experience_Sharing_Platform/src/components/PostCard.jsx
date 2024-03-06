import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id,title,featuredImage}){
 
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white    hover:bg-slate-100
             rounded-md overflow-hidden  p-2"> 
                <div className="w-full   justify-center mb-4">
                    <img src={`${service.getFilePreview(featuredImage)}`}  alt="img" className="w-full sm:h-36 h-40  rounded-md"/> 
                </div> 
                <h2 className="text-sm md:text-md  font-semibold pb-2"> {title} </h2>               
            </div>    
        </Link>
    )
}
export default PostCard;