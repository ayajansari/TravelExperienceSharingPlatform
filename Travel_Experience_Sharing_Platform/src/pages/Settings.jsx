import React, { useState } from 'react';
 
function Settings(){
    const [passwordVisible,setPasswordVisible]=useState(false)
    const [oldPassword,setOldPassword]=useState()
    const [newPassword,setNewPassword]=useState()

    return (
        <div className=' pt-12  bg-[#F7F8FA]'>
            <p className='text-xl  pb-8 px-8 md:px-24 text-[#757575] '>username/settings</p>
            <div className='flex flex-col justify-center mx-6 sm:mx-auto sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5  bg-white border py-6 px-4 '>
                
                <h1 className='border-b'>Change Password</h1>

                <div  className="flex  px-2 m-2 border hover:border-[#1080e9]  rounded-sm">
                    <input 
                        type={passwordVisible? 'text':'password'} 
                        placeholder="Enter Password" 
                        className="w-full py-2 focus:outline-none "

                    />
                    <button
                        type="button"
                        className="w-8 pl-2"
                        onClick={()=> setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? (<img src="/src/assets/open.png" />) :(<img src="/src/assets/hide.png" />) }
                    </button>
                </div>

            </div>
        </div>
    )
}
export default Settings;