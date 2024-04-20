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


    //
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImagePreview = async () => {
            try {
                if(post){

                
                    const filePreview =await  appwriteService.getFilePreview(post.featuredImage);
                    // console.log("i am getting",filePreview)
                    setImageUrl(filePreview);
                }
            } catch (error) {
                console.error('Error fetching image preview:', error);
            }
        };

        fetchImagePreview();
    }, [post]); // Run this effect only once, on component mount


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
            <div className=" py-4 px-8 mx-6 sm:mx-20 md:mx-36 lg:mx-64 xl:mx-96   rounded-sm">
                <div className="w-full text-center ">
                    <div className=" font-semibold p-2 my-4 text-[#2F87FE] ">
                        <p className="text-4xl py-2 ">{post.title}  </p>

                        <div className="flex justify-center text-sm  text-[#00000051]">
                            <p>By {post.name} | </p>
                            <p className="pl-1"> updated:{post.$updatedAt.substr(0,10)}</p>
                        
                        </div>
                    </div>
                </div>
                <div className=" items-center mb-4 rounded-xl ">
                    

                    {imageUrl ? (

                        <img src={imageUrl} alt="File Preview" className="rounded-sm w-full h-72 sm:h-72 md:h-80 lg:h-96" />

                    ) : (

                        <p>Loading...</p>
                )}
                </div>
                
                <div className="my-16 leading-8 text-justify px-12 text-md  text-[#000000c9] ">
                    {parse(post.content)}

                </div>
                {isAuthor && (
                        
                    <div className="mt-12 mb-6 flex justify-evenly">
                        <Link to={`/edit-post/${post.$id}`}>
                            
                            <InputButton  content="Edit"  className="bg-[#2f89fed7] hover:bg-[#2F87FE] px-12 text-white py-2 rounded-sm text-lg font-semibold " />
                        </Link>
                        <InputButton className=" border border-red-600 text-red-600 bg-white hover:text-white hover:bg-red-600 px-12 py-2 rounded-sm text-lg font-semibold" 
                                    content="Delete" 
                                    onClick={deletePost}
                        />

                    
                    </div>
                )}
                
            </div>
        </div>
    ) : null;
}