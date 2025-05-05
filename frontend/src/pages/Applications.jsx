import { jobsApplied } from '@/assets/assets'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const Applications = () => {
  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-18 mx-auto my-8'>
        <h2 className='font-extrabold text-3xl sm:text-5xl text-center m-5 mb-14'>My Applications</h2>
        <div className='flex px-1 sm:px-10 text-xl'>
          <table className='w-full table-fixed border border-gray-400'>
            <thead>
              <tr className='border-b'>
                <th className='p-5 lg:pl-15 text-left text-2xl'>Company</th>
                <th className='p-5 lg:pl-15 text-center text-2xl'>Job Title</th>
                <th className='p-5 pr-2 lg:pl-15 text-center text-2xl hidden sm:table-cell'>location</th>
                <th className='p-5 pr-2 lg:pl-15 text-center text-2xl hidden sm:table-cell'>Date</th>
                <th className='p-5 pr-2 lg:pl-15 text-center text-2xl '>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => true ? (
                <tr>
                  <td className='p-4 pt-6 lg:pl-15 flex items-center gap-2'>
                    <img className='h-6' src={job.logo} alt="" />
                  </td>
                  <td className='p-4 lg:pl-15 text-center'>{job.title}</td>
                  <td className='p-4 pr-2 lg:pl-15 text-center hidden sm:table-cell'>{job.location}</td>
                  <td className='p-4 pr-2 lg:pl-15 text-center hidden sm:table-cell'>{job.date}</td>
                  <td className='p-4 pr-2 lg:pl-15 text-center'>
                    <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded inline-block w-28 text-center`}> {job.status} </span>
                  </td>
                </tr>
              )
                :
                (null))}
            </tbody>
          </table>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Applications
