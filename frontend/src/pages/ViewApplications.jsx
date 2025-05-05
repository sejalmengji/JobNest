import { assets, viewApplicationsPageData } from '@/assets/assets'
import React from 'react'

const ViewApplications = () => {
    return (
        <div className='w-full overflow-x-auto p-8 max-sm:p-4'>
            <div>
                <table className='w-full max-sm:text-sm border border-gray-500'>
                    <thead>
                        <tr className='border-b text-xl'>
                            <th className='py-3 px-4 text-center'>#</th>
                            <th className='py-3 px-12 text-center max-sm:py-2 max-sm:px-1'>User Name</th>
                            <th className='py-3 px-12 text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>Job Title</th>
                            <th className='py-3 px-12 text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>Location</th>
                            <th className='py-3 px-12 text-center max-sm:py-2 max-sm:px-1'>Resume</th>
                            <th className='py-3 px-12 text-center max-sm:py-2 max-sm:px-1'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewApplicationsPageData.map((applicant, index) => (
                            <tr key={index} className='text-gray-700'>
                                <td className='py-3 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>{index + 1}</td>
                                <td className='py-3 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>{applicant.name}</td>
                                <td className='py-3 px-12 border-b text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>{applicant.jobTitle}</td>
                                <td className='py-3 px-12 border-b text-center max-sm:py-2 max-sm:px-1 max-sm:hidden'>{applicant.location}</td>
                                <td className='py-3 px-12 border-b text-center max-sm:py-2 max-sm:px-1'>
                                    <a target='_blank' className='text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'> Resume <img src={assets.resume_download_icon} alt="" /></a>
                                </td>
                                <td className='py-3 px-4 border-b text-center relative'>
                                    <div className='relative inline-block text-left group'>
                                        <button className='text-gray-500 action-button'>...</button>
                                        <div className='absolute right-2 top-full hidden z-10 mt-2 w-32 bg-white border border-gray-500 rounded shadow group-hover:block'>
                                            <button className='w-full block text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                                            <button className='w-full block text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewApplications
