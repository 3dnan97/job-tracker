// TODO: Planned improvements for JobList
// - Sync filters to URL
// - Memoize filtering to avoid unnecessary recalcs

import { Link } from "react-router-dom";
import JobListCard from "../components/JobListCard";
import { useJobs } from "../context/JobsContext";
import useJobsApi from "../hooks/useJobsApi";
import { useEffect, useState } from "react";
import { type Job } from "../types/job";
import Button from "../components/Button";

export default function JobList() {
    const { state } = useJobs()
    const { jobs, isLoading, error } = state
    const { fetchJobs } = useJobsApi()
    const [uiJobs, setUiJobs] = useState<Job[]>(jobs)
    const [selectValue, setSelectValue] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        fetchJobs()
    }, [])

    useEffect(() => {
        setUiJobs(jobs)
    }, [jobs])

    useEffect(() => {
        if (!searchValue && !selectValue) {
            setUiJobs(jobs)
            return
        }
        let filteredJobs = jobs
        if (selectValue) {
            filteredJobs = filteredJobs.filter((job) => job.status === selectValue)
        }
        if (searchValue) {

            const timeoutId = setTimeout(() => {
                const q = searchValue.trim().toLowerCase()
                filteredJobs = filteredJobs.filter(
                    (job) =>
                        job.role.toLowerCase().includes(q)
                        || job.company.toLowerCase().includes(q)
                        || (job.confidence ?? '').toLowerCase().includes(q)
                        || (job.location ?? '').toLowerCase().includes(q)
                        || (job.job_description ?? '').toLowerCase().includes(q)
                        || (job.notes ?? '').toLowerCase().includes(q)
                )
                setUiJobs(filteredJobs)
            }, 300);
            return () => clearTimeout(timeoutId)
        }
        setUiJobs(filteredJobs)
    }, [searchValue, selectValue, jobs])

    return (
        <div className="flex flex-col gap-3 md:gap-5 px-4 pb-5 md:p-8">
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[28px] md:text-[32px] font-bold">Jobs</h1>
                    <p className="text-sm md:text-[16px] text-brand-slate">{`${jobs.length} tracked application${jobs.length === 1 ? '' : 's'}`}</p>
                </div>
                <Button text="+ New Job" to="new" className="self-end" />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                <div className="flex gap-2 md:gap-3">
                    <div className="flex-5 md:flex-initial flex items-center gap-2 h-input w-full md:w-auto px-2 rounded-10px bg-white border border-brand-border">
                        <p className="w-[30%] me-1">Status: </p>
                        <select name="status" id="status" className="w-[70%]" onChange={(e) => setSelectValue(e.currentTarget.value)} value={selectValue}>
                            <option value="">All</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Offer">Offer</option>
                        </select>
                    </div>
                    <div className="flex-6 md:flex-initial flex items-center gap-2 h-input w-full md:w-auto px-2 rounded-10px bg-white border border-brand-border">
                        <label htmlFor="search" className="hidden md:inline md:w-[20%]">Search: </label>
                        <input type="text" name="search" id="search" onChange={(e) => setSearchValue(e.currentTarget.value)} value={searchValue} placeholder="company or role" className="w-full outline-none md:w-[80%]" />
                    </div>
                </div>
                {(selectValue || searchValue) && <Button text="Clear Filters" onClick={() => {setSearchValue(''); setSelectValue('');}} color="white" className="self-end h-input"/>}
            </div>
            <div className="flex flex-col gap-2 p-4 rounded-[14px] bg-white border border-brand-border">
                {
                    isLoading
                        ? <div className="flex justify-center items-center min-h-[200px]">
                            <div className="h-10 w-10 rounded-full border-4 border-brand-border border-t-brand-blue animate-spin"></div>
                        </div>
                        : error
                            ? <div className="flex flex-col gap-3 justify-center items-center p-4 min-h-[200px] text-center text-red-900">
                                <h2 className="text-2xl font-bold">Couldn't Load your applications</h2>
                                <p>Check your connection and try again.</p>
                                <div className="flex gap-2 font-semibold">
                                    <Button text="Retry" onClick={() => fetchJobs()} color="red" className="!text-base"/>
                                    <Button text="Back to Dashboard" to={'/'} color="white" className="!text-base border-red-900/50 hover:border-red-900/40 hover:bg-red-900/20"/>
                                </div>
                            </div>
                            : (uiJobs.length === 0)
                                ? <div className="flex flex-col justify-center items-center gap-2 min-h-[200px]">
                                    <div className="text-2xl font-semibold">No applications found</div>
                                    <p className="text-brand-slate">{(selectValue || searchValue) ? 'Try a broader search or change status filter' : 'Start adding new Jobs to see results here.'}</p>
                                </div>
                                : uiJobs.map((job) => <JobListCard key={job.id} job={job} />)
                }
            </div>
        </div>
    )
}