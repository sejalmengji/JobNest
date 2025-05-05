import React, { useContext, useEffect, useState } from "react";
import { assets, JobCategories, JobLocations } from "@/assets/assets";
import JobCard from "./JobCard";
import { AppContext } from "@/context/AppContext";

const JobListing = () => {

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    // fetch jobsData from context
    const { jobs, searchFilter } = useContext(AppContext);

    // Stores user selected filter
    const [selectedcategory, setSelectedcategory] = useState("");
    const [selectedlocation, setSelectedlocation] = useState("");

    // stores jobs based on applied filter or searched on job postings
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    // filter data according to our selected category and location - runs when above state variables changes
    useEffect(() => {
        const matchesCategory = job => selectedcategory.length === 0 || selectedcategory.includes(job.category) // returns true if no category is selected or job matches selected category
        const matchesLocation = job => selectedlocation.length === 0 || selectedlocation.includes(job.location)
  
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        // clones and reverse(.reverse) job list to show latest jobs first n filters job according to selected conditions
        const newFilteredJobs = jobs.slice().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        // updates filtered job list and reset page to 1
        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedcategory, selectedlocation, searchFilter])
    

    return (
        <div className="w-full px-6 py-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 id='job-list' className="font-extrabold text-4xl sm:text-6xl text-center mb-12 ">Latest Jobs</h1>

                {/* Filters */}
                <div className="flex sm:flex-row flex-wrap gap-4 mb-6">
                    <select className="bg-gray-100 text-black px-6 py-3 rounded-md border border-gray-300 flex-grow" value={selectedcategory} onChange={(e) => setSelectedcategory(e.target.value)}>
                        {!selectedcategory && (
                            <option value='' hidden> Filter by Category </option>
                        )}
                        {/* map JobCategories array from assets.js file */}
                        {
                            JobCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))
                        }
                    </select>

                    <select className="bg-gray-100 text-black px-6 py-3 rounded-md border border-gray-300 flex-grow" value={selectedlocation} onChange={(e) => setSelectedlocation(e.target.value)}>
                        {!selectedlocation && (
                            <option value='' hidden> Filter by location </option>
                        )}
                        {
                            JobLocations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))
                        }
                    </select>

                    {/* onClick will clear the applied filters */}
                    <button onClick={() => {
                        setSelectedcategory(""); setSelectedlocation(""); setSearchFilter({ title: "", location: "" });
                        setIsSearched(false);
                    }} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md w-auto">Clear Filters</button>
                </div>

                {/* Job Listings Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs
                        .slice((currentPage - 1) * 6, currentPage * 6) // display only 6 cards per page - for pagination
                        .map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                </div>

                {/* Pagination */}
                {
                    filteredJobs.length > 0 && (
                        <div className="flex items-center justify-center space-x-2 mt-10 ">
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
                            </a>
                            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                <a key={index} href="#job-list">
                                    <button onClick={() => setCurrentPage(index + 1)} className={`flex items-center justify-center border border-gray-300 rounded w-10 h-10 ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                                </a>
                            ))}
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                            </a>
                        </div>
                    )}

            </div>
        </div>
    );
};

export default JobListing;
