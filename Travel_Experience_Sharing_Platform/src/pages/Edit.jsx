import React from 'react';
import { InputButton, InputField } from '../exports';
import { useForm } from 'react-hook-form'; 
function Edit(){
    
    const {handleSubmit,register}=useForm()
    const handleSave=(data)=>{
        console.log(data);

    }
    return (

        <div className='bg-[#F7F8FA]'>
            <p className='text-xl  text-[#757575] pt-12 px-8 md:px-24' >username/edit</p>
            <div className=' w-full  py-16 px-4 sm:px-16 md:px-28  lg:px-52 xl:px-80 '>

                <form onSubmit={handleSubmit(handleSave)}>
                    <div className=' bg-white  px-8 py-8 rounded-md shadow-xl'> 
                        <InputField 
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3   border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-md "
                            {...register("username")}  
                        />
                        <InputField 
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 my-4   border focus:outline-none    rounded-md " 
                            readOnly={true}
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