import React from "react";
import {InputButton, InputField,RTE} from "../../exports"
import {get, useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useCallback } from "react";
function PostForm({post}){

    const { register,control,watch, handleSubmit,  setValue,  getValues } = useForm({
        defaultValues: {    
            title: post?.title || "",
            country:post?.country || "India",
            state:post?.state || "America",
            place:post?.place || "",
            slug: post?.$id || "",     
            content: post?.content || "",
            status:post?.status || "active"
            
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    
    // console.log("user id:",userData)
    
    const formSubmit = async (data) => {    //data is the entire data of form 

        if (post) {     //edit post
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
        } else { 
               
            console.log(data)
            
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
            <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col justify-center items-center mx-0 xsm:mx-4 sm:mx-12  lg:mx-40 xl:mx-60 border border-[#006494] rounded-lg overflow-hidden">
                <h1 className="w-full  bg-[#006494] text-white font-semibold text-lg py-3 text-center">Create New Post</h1>
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
                                <select name="country" id="country" className="md:w-full border py-2 pl-3 md:pl-2 md:pr-4 md:mr-2 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494]  rounded-sm"
                                    {...register("country",{
                                        required:true
                                    })}     
                                >  
                                    <option value=""  >Select Country</option>
                                    <option value="India"  >India</option>
                                    <option value="Japan">Japan</option>
                                    <option value="America"  >America</option>
                                    <option value="Nepal" >Nepal</option>
                                </select>
                               
                                <select name="state" id="" className="w-full border py-2 pl-3 md:pl-2 md:pr-4  md:mx-2 my-2 text-[#00000051] font-semibold focus:outline-none focus:border-[#006494] rounded-sm"
                                    {...register("state",{
                                        required:true
                                    })}
                                    
                                >
                                    <option value=""  >Select State</option>
                                    <option value="India" >India</option>
                                    <option value="Japan" >Japan</option>
                                    <option value="America" >America</option>
                                    <option value="Nepal" >Nepal</option>
                                
                                
                                </select>

                                <select name="place" id="" className="w-full border  py-2 pl-3 md:pl-2 md:pr-4 md:ml-2 my-2 text-[#00000051]  font-semibold focus:outline-none focus:border-[#006494] rounded-sm"
                                    {...register("place",{
                                        required:true
                                    })}
                                    
                                >
                                    <option value=""  >Select Place</option>
                                    <option value="India"  >India</option>
                                    <option value="Japan" >Japan</option>
                                    <option value="America" >America</option>
                                    <option value="Nepal" >Nepal</option>                          
                                </select>
                        </div>

                        <RTE control={control} defaultValue={getValues("content")}  />
                        
                        <div className="flex ">
                            <input type="file" name="postImage" id="" className="py-4 w-60  "
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image",{
                                    required:!post
                                })}    
                            />
                            {post && (
                                <div className="w-full mb-4">
                                    <img
                                        src={ `${appwriteService.getFilePreview(post.featuredImage)}`}
                                        alt="img"
                                        className="rounded-lg"
                                    />
                                </div>
                            )}

                            <select className="pl-2 pr-6 my-2 border  md:ml-2 ml-auto mr-0  text-[#00000051]  font-semibold focus:outline-none focus:border-[#006494] rounded-sm" 
                                name="status" id="status"
                                
                                {...register("status", { required: true })}
                                
                            >   
                                <option value=""  >Select Status</option>
                                <option value="active" >active</option>
                                <option value="inactive" >inactive</option>
                        
                            </select>
                        </div>

                        

                        <hr className="border-t border-t-slate-200 " />
                        <p className="text-[#00000054] text-sm">You can always edit this information from My Posts section.</p>
                        <div className="mt-12 mb-6 flex justify-evenly">
                            <InputButton 
                                content="Cancel" 
                                className="border border-[#006494] text-[#006494] bg-white px-6 py-2 rounded-sm text-lg font-semibold "
                                onClick={handleCancle}
                            />
                            <InputButton type="submit" content="Save"  className="bg-[#006494] px-6 text-white py-2 rounded-sm text-lg font-semibold " />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PostForm