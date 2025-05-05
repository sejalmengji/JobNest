import { assets } from '@/assets/assets';
import { AppContext } from '@/context/AppContext';
import React, { useEffect, useContext, useState } from 'react'

const RecruiterLogin = () => {

  {/* to go to home page when clicked on cross icon */ }
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSumbmited, setIsTextDataSumbmited] = useState(false);

  // when clicked on create button of sign up the isTextDataSumbmited becomes true
  const onSubmitHandler = async (e) => {
    {/* prevent page from reloading */ }
    e.preventDefault()
    if (state === 'Sign Up' && !isTextDataSumbmited) {
      setIsTextDataSumbmited(true)
    }
  }

  // When login page is opned we can't scroll the webpage
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center '>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>

        {/* Cross icon */}
        <img onClick={(e) => setShowRecruiterLogin(false)} className='absolute top-5 right-5 h-3 w-3 cursor-pointer' src={assets.cross_icon} />

        <h1 className='text-center text-2xl text-neutral-700 font-medium'> Recruiter {state} </h1>

        {
          state === 'Login'
            ? <p className='text-sm'>Welcome back! Please log in to continue</p>
            : <p className='text-sm'>Welcome back! Please sign in to continue</p>
        }

        {/* if its sign up then show <> this fragment if not then show login fragment <> */}
        {
          state === 'Sign Up' && isTextDataSumbmited
            ?
            <>
              <div className='flex items-center gap-4 my-10'>
                <label htmlFor="image">
                  {/* if image is selected then it will be shown else how the upload area img */}
                  <img className='w-16 rounded-full ' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                  <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                </label>
                <p>Upload Company <br /> logo </p>
              </div>
            </>
            :
            <>
              {/* if state is not login then show this div */}
              {state !== 'Login' && (
                <div className='border px-4 py-2 flex items-center gap-2 mt-5 rounded-md'>
                  <img src={assets.person_icon} alt="" />
                  {/*whenever you change input field value it will be stored in name state varibale*/}
                  <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Company Name' required />
                </div>
              )}
              <div className='border px-4 py-2 flex items-center gap-2 mt-5 rounded-md'>
                <img src={assets.email_icon} alt="" />
                <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm' type="email" placeholder='Email Id' required />
              </div>
              <div className='border px-4 py-2 flex items-center gap-2 mt-5 rounded-md'>
                <img src={assets.lock_icon} alt="" />
                <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='Password' required />
              </div>
            </>
        }

        {
          state === 'Login' &&
          <p className='text-sm text-blue-600 cursor-pointer mt-3 ml-auto w-fit'>Forgot Password?</p>
        }

        <button type='submit' className='bg-blue-500 w-full rounded-full text-white py-2 mt-5 cursor-pointer'>
          {state === 'Login' ? 'login' : isTextDataSumbmited ? 'next' : 'create account'}
        </button>

        {
          state === 'Login'
            ? <p className='mt-5 text-center'>Don't have an account? <span onClick={() => setState("Sign Up")} className='text-blue-600 hover:text-black cursor-pointer'> Sign In</span></p>
            : <p className='mt-5 text-center'>Already have an account?<span onClick={() => setState("Login")} className='text-blue-600 hover:text-black cursor-pointer'> Login</span></p>
        }

      </form>
    </div>
  )
}

export default RecruiterLogin
