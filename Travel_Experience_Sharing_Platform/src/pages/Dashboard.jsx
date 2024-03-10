import React from 'react';
import { useSelector } from 'react-redux';
 
function Dashboard(){
    const userData=useSelector((state)=>state.auth.userData)
    console.log(userData)
    return (
        <div className=' bg-red-600 '>

            <div className='text-sky-700 rounded-lg w-full p-8'>fj;dkfd;d j;</div>
            
            
            {/* <div className='flex md:flex-row flex-col  '>
                <div className='md:w-1/3 w-full border-2  border-red-600 p-4'>
                    <img src="/src/assets/user (1).png" className="  w-20 p-4 bg-blue-400 rounded-full"  alt="" />
                    <div>
                        <div className='flex'>
                            <p className='text-lg'>{userData && userData.name}</p>
                            {userData && userData.status &&  (
                                <img src="/src/assets/checklist_.png" alt="" className='w-6 ' />
                            )}
                        </div>
                        
                        <h3 className='text-sm '>{userData && userData.email}</h3>
                    
                    </div>
                    
                </div>
                <div className='md:w-2/3 w-full border-2  border-red-600 p-4 md:ml-4'> contribution section</div>
            </div> */}
        </div>

    )
}
export default Dashboard;