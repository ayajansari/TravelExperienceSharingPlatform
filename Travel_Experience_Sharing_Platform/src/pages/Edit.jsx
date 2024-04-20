import React, { useEffect, useState } from 'react';
import { InputButton, InputField } from '../exports';
import { useForm } from 'react-hook-form'; 
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
function Edit(){
    const userData=useSelector((state)=>state.auth.userData)
    const {handleSubmit,register,getValues,setValue}=useForm({
        defaultValues:{
            "name":"",
            "email":"",
            "about":"",
            "instagram":"",
            "facebook":"",
            "twitter":""
        }
    })
    let profileData;
    useEffect(()=>{
        try{
            if(userData){
                const count=service.listUserDetails(userData.$id);
                if(count>0){
                    //userDetails are already present ,only update data
                    service.getProfileData(userData.$id).then((data)=>{
                        console.log("userProfileData received:",data);
                        profileData=data;
                    })
                }
            }
            
        }
        catch(err){
            throw err;
        }
    },[userData])
    
    // useEffect(()=>{

    //     const setInitials=()=>{
    //         if(userData){

            
                // console.log("userDetails:",userData)
                // setValue("name",userData.name)
                // setValue("email",userData.email)
                
    //         }
    //     }
    //     setInitials();
    // },[setValue])//run only once when component mounts
    // let cnt=0;
    if(userData){
        console.log("userDetails:",userData)
        setValue("name",userData.name)
        setValue("email",userData.email)
        // cnt++;
        // console.log(getValues("name"))
    }
    
    const handleSave=async (data)=>{
        
        data={...data,"$id":userData.$id}
        // if(userDetails){
        //     console.log("trying to update data:");
        // }else{
        //     console.log("trying to create document for user data:")
        // }
        console.log("mydata:",data);

        // service.updataDetails(data);
    }
    return userData && (

        <div className='bg-[#F7F8FA]'>
            <p className='text-xl  text-[#757575] pt-12 px-8 md:px-24' >username/edit</p>
            <div className=' w-full  py-16 px-4 sm:px-16 md:px-28  lg:px-52 xl:px-80 '>

                <form onSubmit={handleSubmit(handleSave)}>
                    <div className=' bg-white  px-8 py-8 rounded-md shadow-xl'> 
                        <InputField 
                            type="text"
                            // value={profileData?profileData.name:"Username"}
                            defaultValue={getValues("name")}
                            onChange={(e)=> setValue("name",e.target.value)}
                            placeholder="Username"
                            
                            className="w-full px-4 py-3   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                            {...register("name")}  
                        />
                        <InputField 
                            type="email"
                            // placeholder="Email"
                            value={userData? userData.email:"Email"}
                            className="w-full px-4 py-3 my-4   border focus:outline-none  text-[#00000075]  rounded-md " 
                            // readOnly={true}
                            disabled={true}
                        />
                        <textarea 
                            name="about" 
                            id="about"  
                            rows="10" 
                            placeholder='About' 
                            readOnly={false} 
                            className='w-full px-4 py-3 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md'
                            {...register("about")}
                        >
                            
                        </textarea>
                        <div className='w-full px-6 pt-4 pb-6 my-3   border  rounded-md'>
                            <h1 className='text-lg text-[#9CA3AF]'>Social Media Links</h1>
                            <div className=' flex items-center py-3 '>                            
                                <img src="/src/assets/instagram.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    placeholder="Instagram URL"
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("instagram_link")}  
                                />
                            </div>
                            <div className=' flex items-center py-3'>                            
                                <img src="/src/assets/facebook.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    placeholder="Facebook URL"
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("facebook_link")}  
                                />
                            </div>
                            <div className=' flex items-center py-3'>                            
                                <img src="/src/assets/twitter.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    placeholder="Twitter URL"
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("twitter_link")}  
                                />
                            </div>
                            
                        </div>

                        <InputButton 
                            type="submit" 
                            content="Save"  
                            className="w-24 bg-[#2F87FE] hover:bg-[#0570fc]   px-6 py-2  md:ml-1 my-5 text-white   rounded-sm  font-semibold text-xl " 
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Edit;