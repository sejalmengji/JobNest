import { manageJobsData } from '@/assets/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {
  
    const navigate = useNavigate();
  
    return ( 
      <div className='w-full max-w-[100%] overflow-x-auto p-8 max-sm:p-4 max-sm:pt-5'>
                  <div>
                      <table className='w-full max-sm:text-sm border border-gray-500'>
                          <thead>
                              <tr className='border-b text-xl'>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>#</th>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1'>Job Title</th>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>Date</th>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>Location</th>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1'>Applicants</th>
                                  <th className='py-4 px-12 text-center max-sm:py-2 max-sm:px-1'>Visible</th>
                              </tr>
                          </thead>
                          <tbody>
                              {manageJobsData.map((job , index) => (
                                  <tr key={index} className='text-gray-700'>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>{index + 1}</td>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>{job.title}</td>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>{job.date}</td>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>{job.location}</td>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>{job.applicants}</td>
                                      <td className='py-4 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>
                                          <input className='scale-125 ml-4' type="checkbox"  />
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>

                  <div className='flex justify-end mt-4'>
                    <button onClick={() => navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add new Job</button>
                  </div>
              </div>
  )
}

export default ManageJobs
