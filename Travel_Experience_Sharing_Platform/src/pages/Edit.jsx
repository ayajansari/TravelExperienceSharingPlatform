import React, { useEffect, useState } from 'react';
import { InputButton, InputField } from '../exports';
import { useForm } from 'react-hook-form'; 
import {useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import service from '../appwrite/config';
function Edit(){
    const userData=useSelector((state)=>state.auth.userData)
    const [userDetails,setUserDetails]=useState()
    const navigate=useNavigate()
    const {handleSubmit,register,getValues,setValue}=useForm({
        defaultValues:{
            "Name":"",
            "Email":"",
            "About":"",
            "Instagram":"https://instagram.com/user",
            "Facebook":"https://facebook.com/user",
            "Twitter":"https://twitter.com/user"
        }
    })


    useEffect(()=>{
        try{
            if(userData){
                service.userDetails(userData.$id).then((data)=>{
                    
                    console.log("userProfileData received:",data);
                    setUserDetails(data.Name)
                    setValue("Name",data.Name)
                    setValue("About",data.About)
                    setValue("Instagram",data.Instagram)
                    setValue("Facebook",data.Facebook)
                    setValue("Twitter",data.Twitter)
 
                })
                
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
    
    
    const handleSave=async (data)=>{
        console.log("mydata:",data);
        
        data={...data,"$id":userData.$id}
        if(userDetails){
            console.log("trying to update data:");
            try {
                
                service.updateUserDetails(data).then((data)=>{
                    console.log("updated successfully")
                    navigate("/user/dashboard")
                })
                
            } catch (err) {
                console.log("update unsuccessfull")
                throw err;
            }
            
        }else{
            console.log("trying to create document for user data:")
            try {
                
                service.createUserDetails(data).then((status)=>{
                    console.log("status :",status)
                    navigate("/user/dashboard")
                    
                })

            } catch (err) {
                throw err;
            }
        }
        

        
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
                            defaultValue={getValues("Name")}
                            placeholder="Username"
                            className="w-full px-4 py-3   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                            {...register("Name")}  
                        />
                        <InputField 
                            type="email"
                            placeholder="Email"
                            defaultValue={userData && userData.email}
                            className="w-full px-4 py-3 my-4   border focus:outline-none  text-[#00000075]  rounded-md " 
                            disabled={true}
                        />
                        <textarea 
                            name="about" 
                            id="about"  
                            rows="10" 
                            defaultValue={getValues("about")}
                            placeholder='About' 
                            readOnly={false} 
                            className='w-full px-4 py-3 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md'
                            {...register("About")}
                        >
                            
                        </textarea>
                        <div className='w-full px-6 pt-4 pb-6 my-3   border  rounded-md'>
                            <h1 className='text-lg text-[#9CA3AF]'>Social Media Links</h1>
                            <div className=' flex items-center py-3 '>                            
                                <img src="/src/assets/instagram.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    defaultValue={getValues("Instagram")}
                                    placeholder="Instagram URL"
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("Instagram")}  
                                />
                            </div>
                            <div className=' flex items-center py-3'>                            
                                <img src="/src/assets/facebook.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    defaultValue={getValues("Facebook")}
                                    placeholder="Facebook URL"
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("Facebook")}  
                                />
                            </div>
                            <div className=' flex items-center py-3'>                            
                                <img src="/src/assets/twitter.png " alt="" className='w-8 h-8' />
                                <InputField 
                                    type="text"
                                    placeholder="Twitter URL"
                                    defaultValue={getValues("Twitter")}
                                    className="w-full px-4 py-1.5 ml-4   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                                    {...register("Twitter")}  
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