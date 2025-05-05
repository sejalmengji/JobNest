import { jobsData } from "@/assets/assets";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider =(props) =>{

    const [searchFilter, setSearchFilter] = useState({ title:'', location:''})

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]); 

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    }, [])
    

    // Value Object - so this state variable can be accessed by any component of app
    const value={
        searchFilter, setSearchFilter, isSearched, setIsSearched, jobs, setJobs, showRecruiterLogin, setShowRecruiterLogin, showRecruiterLogin, setShowRecruiterLogin
    }
    
    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
    )
}

export default AppContextProvider