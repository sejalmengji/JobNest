import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';

const Navbar = () => {

  // to display signIn pop up when clicked on user login button - openSignIn fn triggers signIn pop up manually
  const { openSignIn } = useClerk();
  // to display which user is currently Signed in
  const { user } = useUser();

  const navigate = useNavigate();

  // Show Recruiter Login Pop up when clicked on Recruiter Login
  const {setShowRecruiterLogin} = useContext(AppContext);

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 flex justify-between items-center'>
        <img onClick={() => navigate('/')} src={assets.logo} className='w-25 h-17 cursor-pointer'/> 
        {
          // if user exits then show its profile if not then display buttons to log in
          user
          ? <div className='flex items-center gap-3'>
            <Link to={'/applications'}>Applied Jobs</Link>
            <p> | </p>
            <p>{user.firstName + " " + user.lastName}</p>
            <UserButton/>
          </div>
          : <div className='flex gap-4 max-sm:text-xs '>
          <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
          <button onClick={e => openSignIn()} className='bg-emerald-500 text-white px-6 sm:px-9 py-2 rounded-full'>User Login</button>
        </div>
        }
        
      </div>
    </div>
  ) 
}

export default Navbar


