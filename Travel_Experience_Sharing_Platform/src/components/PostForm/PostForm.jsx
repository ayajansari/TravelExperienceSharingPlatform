import React, { useState } from "react";
import {InputButton, InputField,RTE,Select} from "../../exports"
import {get, useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useCallback } from "react";
function PostForm({post}){

    const { register,control, handleSubmit,  setValue,  getValues } = useForm({
        defaultValues: {    
            title: post?.title || "",
            country:post?.country || "India",
            state:post?.state || "China",
            place:post?.place || "Japan",
            slug: post?.$id || "",     
            content: post?.content || "",
            status:post?.status || "Active"
            
        },
    });
    

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [error,setError]=useState("")


    const countryArr=["India","Japan","China","Nepal","Russia"];
    const stateArr=["India","Japan","China","Nepal","Russia"];
    const placeArr=["India","Japan","China","Nepal","Russia"];

    
    const formSubmit = async (data) => {    //data is the entire data of form 

        console.log(data.content.length)
        if(data.content.length>255){
            setError("Length of post content should be less than 255 characters")
            return 
        }

        if (post) {     //edit post

            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;    //upload the updated image
                console.log("file uploaded",file)
                if (file) {
                    appwriteService.deleteFile(post.featuredImage); //delete previous image
                }
                console.log("post id:",data)
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {

                    navigate(`/post/${dbPost.$id}`);
                }
                
            } catch (error) {
                console.log(error.message)
                throw error
            }
            
        } else { 
               
            
            
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

    // React.useEffect(() => {
    //     const subscription = watch((value, { name }) => {
    //         if (name === "title") {
    //             setValue("slug", slugTransform(value.title), { shouldValidate: true });
    //         }
    //     });

    //     return () => subscription.unsubscribe();
    // }, [watch, slugTransform, setValue]);


    return (
        <div className="bg-slate-100 w-full px-8 py-16   ">
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col justify-center items-center mx-0 xsm:mx-4 sm:mx-12  lg:mx-40 xl:mx-60 border border-sky-400 rounded-lg overflow-hidden">
                <h1 className="w-full  bg-sky-400 text-white font-semibold text-lg py-3 text-center">Create New Post</h1>
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
                                    label="Country"
                                    arr={countryArr}  
                                    className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                    {...register("country",{
                                        required:true
                                    })} 
                                />
                                <Select 
                                    label="State"
                                    arr={stateArr}  
                                    className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                    {...register("state",{
                                        required:true
                                    })}
                                />
                                <Select 
                                    label="Place"
                                    arr={placeArr}  
                                    className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                    {...register("place",{
                                        required:true
                                    })} 
                                />

                        </div>

                        <RTE control={control} defaultValue={getValues("content")}  />
                        
                        <div className="flex mt-4">
                            <input type="file" name="postImage" id="" className="py-4 w-60  "
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image",{
                                    required:!post
                                })}    
                            />
                            {post && (
                                <div className="w-32 mb-4 mr-6">
                                    <img
                                        src={ `${appwriteService.getFilePreview(post.featuredImage)}`}
                                        alt="img"
                                        className="rounded-lg"
                                    />
                                </div>
                            )}

                           
                            
                        </div>
                        <Select 
                                label="Status"
                                arr={["Active","Inactive"]}  
                                className="w-full sm:w-40 border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                {...register("status",{
                                    required:true
                                })} 
                        />

                        

                        <hr className="border-t border-t-slate-200 mt-6" />
                        <p className="text-[#00000054] text-sm">You can always edit this information from My Posts section.</p>
                        <div className="mt-12 mb-6 flex justify-evenly">
                            
                            <InputButton type="submit" content="Save"  className="bg-sky-400 px-12 text-white py-2 rounded-sm text-lg font-semibold " />

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