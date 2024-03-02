import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { InputButton } from "../exports";  
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false; 

    //if isAuthor=true then only show edit and delete buttons as this post belongs so that same user
    //currently the post value is null but when useEffect run the post value will set and again above statement
    //will be exectued 

    
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                console.log(post)
                if (post) setPost(post);
                else navigate("/");
            });
        }
    }, []);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/my-posts");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <div className=" py-4 px-8 mx-6 sm:mx-20 md:mx-36 lg:mx-52 xl:mx-80   rounded-sm">
                <div className="w-full text-center ">
                    <h1 className="text-lg font-semibold my-4 ">{post.title}</h1>
                </div>
                <div className=" items-center mb-4 rounded-xl ">
                    
                    <img
                        src={`${appwriteService.getFilePreview(post.featuredImage)}`}
                        alt="img"
                        className="rounded-sm w-full h-60 sm:h-80 lg:h-96" 
                    />
                </div>
                
                <div className="my-6  text-md  text-[#000000c9] ">
                    {parse(post.content)}

                </div>
                {isAuthor && (
                        
                    <div className="mt-12 mb-6 flex justify-evenly">
                        <Link to={`/edit-post/${post.$id}`}>
                            
                            <InputButton  content="Edit"  className="bg-sky-400 px-12 text-white py-2 rounded-sm text-lg font-semibold " />
                        </Link>
                        <InputButton className=" border border-red-400 text-red-400 bg-white hover:text-white hover:bg-red-400 px-12 py-2 rounded-sm text-lg font-semibold" 
                                    content="Delete" 
                                    onClick={deletePost}
                        />

                    
                    </div>
                )}
                
            </div>
        </div>
    ) : null;
}