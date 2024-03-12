import React from 'react';
import { useSelector } from 'react-redux';
import { InputButton } from '../exports';
import { useNavigate } from 'react-router-dom';
 
function Dashboard(){
    const userData=useSelector((state)=>state.auth.userData)
    console.log(userData)
    const navigate=useNavigate()

    const handleEdit=()=>{
        navigate("/user/edit")
    }
    return (
        <div className=' p-8 md:px-28 lg:p-8 xl:px-20 bg-[#F7F8FA] '>

            
            
            
            <div className='flex lg:flex-row flex-col '>
                <div className='lg:w-1/3 w-full lg:h-64  '>

 
                    <div className='   px-6 py-4 mb-4 bg-white shadow-lg rounded-lg'>
                        <div className='flex lg:flex-col items-center flex-row'>
                            <img src="/src/assets/user (2).png" className="  lg:w-24 w-20   "  alt="" />
                            <div className='mb-4 lg:pl-0 pl-6'>
                                <div className='flex lg:justify-center items-center lg:pt-3'>
                                    <p className='text-xl pr-1 '>{userData && "Mohammad Ayaj Ansari"}</p>
                                    {userData && userData.status &&  (
                                        <img src="/src/assets/verified_user.png" alt="" className='w-4 h-4 mt-1' />
                                    )}
                                </div>
                                
                                <h3 className='  text-[#00000084] lg:text-center'>{userData && userData.email}</h3>
                            
                            </div>
                        </div>
                        <div>
                            <InputButton className='w-full py-2 lg:mt-0 mt-6 bg-[#2f89fe12] hover:bg-[#2f89fe1a] text-[#2F87FE] text-lg font-semibold rounded-lg' content={"Edit Profile"} onClick={handleEdit} />
                        </div>

                        
                    </div>
                    <div className='px-6 py-4 mb-4 bg-white h-56 rounded-lg shadow-lg'>
                        <div className='text-xl font-semibold border-b-2  border-[#00000011] pb-2'>
                            Social Media Links
                        </div>
                        <div className='py-3 overflow-scroll  ' id='custom-ScrollBar'>
                            <div className='flex py-1'>
                                <img src="/src/assets/instagram.png" alt="" className='w-6 h-6 ' />
                                <p className='pl-2'>https://www.instagram.com/user_name</p>
                            </div>
                            <div className='flex py-1'>
                                <img src="/src/assets/facebook.png" alt="" className='w-6 h-6 ' />
                                <p className='pl-2' >https://www.facebook.com/user_name</p>
                            </div>
                            <div className='flex py-1'>
                                <img src="/src/assets/twitter.png" alt="" className='w-6 h-6 ' />
                                <p className='pl-2'>https://www.twitter.com/user_name</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='lg:w-2/3 w-full   lg:ml-4 flex flex-col'> 
                    
                    <div className='py-4 px-8 mb-2 bg-white h-56 rounded-lg shadow-lg'>
                        <div className='border-b-2 text-xl font-semibold border-[#00000011] pb-2'>
                            Contributions
                        </div>
                        <div className='py-2 sm:text-lg flex flex-start '>
                            <div className='w-32 h-28  text-center pt-6'> 
                                <h1 className='text-3xl font-semibold text-[#2F87FE]'>100</h1>
                                <h1 className='pt-2'>Active Posts</h1>
                            </div>
                            <div className='w-32 h-28 text-center pt-6'>
                                <h1 className='text-3xl font-semibold text-[#2F87FE]'>10</h1>
                                <h1 className='pt-2'>Inactive Posts</h1>

                            </div>
                            <div className='w-32 h-28  text-center pt-6'>
                                <h1 className='text-3xl font-semibold text-[#2F87FE]'>1</h1>
                                <h1 className='pt-2'>Polls</h1>
                            </div>
                        </div>
                    </div>
                    <div className='px-8 py-4 my-2 bg-white h-56 rounded-lg shadow-lg'>
                        <div className='text-xl font-semibold border-b-2  border-[#00000011] pb-2'>
                            About
                        </div>
                        <div className='py-2  sm:text-lg'>
                            Inquisitive and eager to learn, I navigate the world with a curious mind.
                            With a penchant for exploration,I seek knowledge in every corner.
                            My determination fuels my journey, as I strive for growth and excellence.
                        </div>
                    </div>
                    <div className='px-8 py-4 mt-2 bg-white h-56 rounded-lg shadow-lg'>
                        <div className='text-xl font-semibold border-b-2  border-[#00000011] pb-2'>
                            Orgs & Teams
                        </div>
                        <div className='py-2 sm:text-lg'>
                            You haven't joined any orgs/teams yet.

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}
export default Dashboard;