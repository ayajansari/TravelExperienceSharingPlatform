import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id,title,featuredImage,city,country}){
 
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white    hover:bg-[#f5f5f5]
             rounded-md overflow-hidden  p-3"> 
                <div className="w-full   justify-center mb-4">
                    <img src={`${service.getFilePreview(featuredImage)}`}  alt="img" className="w-full  h-60  sm:h-52 md:h-40 lg:h-48 rounded-md"/> 
                </div> 
                <h2 className=" text-start md:text-md   pb-2"> {title} </h2>
                <div className='flex items-center'>
                    <img src="/src/assets/location.png" alt="" className='w-5 h-5' />
                    <p className='pl-2'>{city+","+country}</p>
                </div>
                               
            </div>    
        </Link>
    )
}
export default PostCard;