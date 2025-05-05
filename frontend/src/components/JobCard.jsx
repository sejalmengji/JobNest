import React from 'react'
import { assets } from '../assets/assets'
import { MapPin, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {

    const navigate = useNavigate();

    return (
            <div className="border border-gray-200 rounded-xl p-6 shadow-md flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">{ job.title }</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <img src={job.company} alt="Google" className="h-5 mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="bg-emerald-500 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm">Apply Now</button>
                    <button className="text-gray-500 hover:text-red-600 transition-colors duration-200"><Heart size={20} /></button>
                </div>
            </div>
    )
}

export default JobCard
