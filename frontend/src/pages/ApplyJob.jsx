import { assets, jobsData } from '@/assets/assets';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ApplyJob = () => {

  // To get the job id according to which we will find job data and store it in a state variable 

  //extracts id from url
  const { id } = useParams()

  // stores currectly selected job
  const [JobData, setJobData] = useState(null);

  // retrives full job list from global context
  const { jobs } = useContext(AppContext)

  // fetching job data by id
  const fetchJob = async () => {
    const data = jobs.filter(job => job._id === id)
    if (data.length !== 0) {
      setJobData(data[0])
      // console.log(data[0]) // to check is data get rendered on console or not
    }
  }

  // whenever id changes then fetch function is called
  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob()
    }
  }, [id, jobs]) 


  // if job is found then render the data or else show loading spinner
  return JobData ?
    (
      <>
        <Navbar />

        <div className='container min-h-screen flex flex-col py-10 px-4 2xl:px-20 mx-auto'>

          <div className='bg-white text-black w-full rounded-lg'>

            <div className='flex flex-wrap justify-center md:justify-between gap-8 px-9 py-10 mb-6 bg-green-50 border border-green-500 rounded-xl'>
              <div className='flex flex-col md:flex-row items-center'>
                <div className='text-center md:text-left text-neutral-700'>
                  <h1 className='font-extrabold text-3xl sm:text-5xl text-center mb-8'>{JobData.title}</h1>
                  <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                    <span className='flex items-center gap-1'>
                      {/* <img src={assets.suitcase_icon} alt="" />
                      {JobData.companyId.name} */}
                      <img className='h-6' src={JobData.company} alt="" />
                    </span>
                    <span className='flex items-center gap-1'>
                      <img src={assets.location_icon} alt="" />
                      {JobData.location}
                    </span>
                    <span className='flex items-center gap-1'>
                      <img src={assets.money_icon} alt="" />
                      ₹{JobData.salary}
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                <button className='bg-blue-600 p-2.5 px-10 text-white rounded shadow'>Apply Now</button>
              </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-between items-start'>
              <div className='w-full lg:w-2/3'>
                <h2 className='font-bold text-2xl mb-4 ml-4'>Job Description</h2>
                <div className='rich-text' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              </div>
              {/* Right Section - more jobs of same company*/}
              <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 spcae-y-5'>
                <h2 className='m-2'>More Jobs from {JobData.companyId.name} </h2>
                {jobs.filter( job => job._id !== JobData._id && job.company === JobData.company)
                .filter(job => true).slice(0,4)
                .map((job, index) => <JobCard key={index} job={job}/>)}
              </div>
            </div>

          </div>
        </div>
        <Footer />
      </>
    )
    :
    (
      <Loading /> // loading spinner
    )
}

export default ApplyJob
