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
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, []);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <div>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={`${appwriteService.getFilePreview(post.featuredImage)}`}
                        alt="img"
                        className="rounded-xl w-2/3  h-80"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <InputButton  className="mr-3 bg-green-500">
                                    Edit
                                </InputButton>
                            </Link>
                            <InputButton className="bg-red-500" onClick={deletePost}>
                                Delete
                            </InputButton>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </div>
        </div>
    ) : null;
}