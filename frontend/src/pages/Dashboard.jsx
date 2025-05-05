import { assets } from '@/assets/assets'
import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();
    
  return (
    <div className='min-h-screen'>

        {/* Navbar */}
        <div className='shadow py-4'>
            <div className='flex px-4 justify-between items-center'>
                <img onClick={() => navigate('/')} src={assets.logo} className='w-25 h-17 cursor-pointer'/>
                <div className='flex items-center gap-3'>
                    <p className='max-sm:hidden'>Welcome</p>
                    <div className='relative group'>
                        <img className='h-7 w-22' src={assets.amazon_logo} alt="" />
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li className='py-1 px-2 pr-10 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div className='flex items-start'>
        
            {/*Left Sidebar */}
            <div className='inline-block min-h-screen border-r-2 border-gray-300'>
                <ul className='flex flex-col items-start pt-5 p-2 text-gray-800'>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
                        <img className='min-w-4' src={assets.add_icon} />
                        <p className='max-sm:hidden'>Add Job</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
                        <img className='min-w-4' src={assets.home_icon} />
                        <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
                        <img className='min-w-4' src={assets.person_tick_icon} />
                        <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>
                </ul>
            </div>

            <div>
                <Outlet/>
            </div>

            {/*Right Sidebar */}
        
        </div>

    </div>
  )
}

export default Dashboard
