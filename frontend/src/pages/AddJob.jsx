import { JobCategories, JobLocations } from '@/assets/assets';
import React, { useState } from 'react'

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Full Stack Developer');
    const [salary, setSalary] = useState(0);

    return (
        <form className='container flex flex-col p-6 pl-10 w-full items-start gap-3'>

            <div className='w-full'>
                <p className='mb-2 font-bold text-xl pt-2'>Job Title</p>
                <input onChange={(e) => setTitle(e.target.value)} value={title} className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' type="text" placeholder='Type here' required />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2 font-bold text-xl pt-2'>Job Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Write the job description here...' className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"/>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2 font-bold text-xl pt-2'>Job Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded'>
                        {JobCategories.map((category,index)=>(
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-bold text-xl pt-2'>Job Location</p>
                    <select onChange={(e) => setLocation(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded'>
                        {JobLocations.map((location,index)=>(
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
            </div>


            <div>
                <p className='mb-2 font-bold text-xl pt-2'>Salary</p>
                <input onChange={(e) => setSalary(e.target.value)} value={salary} min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded  sm:w-[120px]' type="number" placeholder='80000' required />
            </div>

            <button className='flex justify-center w-28 py-3 mt-6 bg-black text-white rounded'>ADD</button>
            
        </form>
    )
}

export default AddJob
