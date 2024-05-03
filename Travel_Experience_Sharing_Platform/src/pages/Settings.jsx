import React, { useState } from 'react';
import { InputButton } from '../exports';
function Settings(){
    const [passwordVisible1,setPasswordVisible1]=useState(false)
    const [passwordVisible2,setPasswordVisible2]=useState(false)
    const [oldPassword,setOldPassword]=useState()
    const [newPassword,setNewPassword]=useState()
    const [isDisable,setIsDisable]=useState(true)

    return (
        <div className='bg-[#F7F8FA]'>

        
            <div className=' pt-12  '>
                <p className='text-xl  pb-8 px-8 md:px-24 text-[#757575] '>username/settings</p>
                <div className='flex flex-col px-6 mx-6 sm:mx-auto sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5 mb-8  bg-white border py-4 rounded-md '>
                    
                    <h1 className='border-b pb-4 text-lg md:text-xl md:text-start text-center'>Change Password</h1>

                    <div  className="flex  px-2 mt-5 border hover:border-[#1080e9]  rounded-md">
                        <input 
                            type={passwordVisible1? 'text':'password'} 
                            placeholder="Old Password" 
                            className="w-full py-3 focus:outline-none "

                        />
                        <button
                            type="button"
                            className="w-8 pl-2"
                            onClick={()=> setPasswordVisible1(!passwordVisible1)}
                        >
                            {passwordVisible1 ? (<img src="/images/open.png" />) :(<img src="/images/hide.png" />) }
                        </button>

                        
                    </div>
                    <div  className="flex  px-2 mt-5 border hover:border-[#1080e9]  rounded-md">
                        <input 
                            type={passwordVisible2? 'text':'password'} 
                            placeholder="New Password" 
                            className="w-full py-3 focus:outline-none "

                        />
                        <button
                            type="button"
                            className="w-8 pl-2"
                            onClick={()=> setPasswordVisible2(!passwordVisible2)}
                        >
                            {passwordVisible2 ? (<img src="/images/open.png" />) :(<img src="/images/hide.png" />) }
                        </button>

                        
                    </div>
                    <p className='pt-6'>Note: If you connected with Google/ Facebook, keep old password as blank</p>
                    <div className='w-full flex justify-center md:justify-start'>

                
                        <InputButton 
                            type="submit" 
                            content="Save"  
                            className="w-24  bg-[#2F87FE] hover:bg-[#0570fc]   px-6 py-2  md:ml-1 mt-12 mb-4 text-white   rounded-sm  font-semibold text-xl " 
                        />
                    </div>
                </div>
            </div>
            <div className=' pb-12  '>
                
                <div className='flex flex-col px-6 mx-6 sm:mx-auto sm:w-2/3 md:w-3/5 lg:w-1/2 xl:w-2/5   bg-white border py-4 rounded-md '>
                    
                    <h1 className='border-b pb-4 text-lg md:text-xl md:text-start text-center'>Delete My Account</h1>

                    
                    
                    <p className='pt-6 pb-4'>Note: Once you delete your account, it's irreversible! To delete your account you shouldn't be part of any organization.</p>
                    <div className='flex items-start'> 

                        <input 
                            type="checkbox" 
                            name="del_account" 
                            id="del_account" 
                            className='mt-1.5  ' 
                            onChange={()=> setIsDisable(!isDisable)}
                        
                        />

                        <label htmlFor="del_account" className='pl-2'> I have understood the implications of deleting my profile and wish to proceed with the deletion</label>
                    </div>
                    <div className='w-full flex justify-center md:justify-start'>

                        <InputButton 
                            type="submit" 
                            content="Save"  
                            disabled={isDisable}
                            
                            className="w-24  bg-[#2F87FE] hover:bg-[#0570fc]  disabled:bg-[#E0E0E0]  px-6 py-2  md:ml-1 mt-12 mb-4 text-white   rounded-sm  font-semibold text-xl " 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;