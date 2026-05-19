import { Link } from "react-router-dom";
import StateCard from "../components/StateCard";
import JobRow from "../components/JobRow";
import { useJobs } from "../context/JobsContext";
import useJobsApi from "../hooks/useJobsApi";
import { useEffect } from "react";

export default function Dashboard() {
    const { state } = useJobs()
    const { jobs, isLoading, error } = state
    const { fetchJobs } = useJobsApi()

    useEffect(() => {
        fetchJobs()
    }, [])

    const cardCount = (title: string): number => jobs.filter(job => job.status === title).length
    return (
        <div className="flex flex-col gap-3 md:gap-6 px-4 pb-5 md:p-8">
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[28px] md:text-[32px] font-bold">Dashboard</h1>
                    <p className="text-sm md:text-[16px] text-brand-slate">Track momentum and next actions</p>
                </div>
                <div className="hidden md:flex justify-end items-end">
                    <Link to="/jobs/new" className="flex justify-center items-center px-[18px] py-3 rounded-10px text-xs font-semibold text-white hover:text-brand-blue bg-brand-blue hover:bg-brand-border duration-200">
                        + Add Job
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex md:flex-1 gap-2">
                    <StateCard title="Applied" count={cardCount("Applied")} isLoading={isLoading} />
                    <StateCard title="Interview" count={cardCount("Interview")} isLoading={isLoading} />
                </div>
                <div className="flex md:flex-1 gap-2">
                    <StateCard title="Offer" count={cardCount("Offer")} isLoading={isLoading} />
                    <StateCard title="Rejected" count={cardCount("Rejected")} isLoading={isLoading} />
                </div>
            </div>
            <Link to="/jobs/new" className="flex md:hidden justify-center items-center h-input rounded-10px text-sm font-semibold text-white bg-brand-blue">
                + Add Job
            </Link>
            <div className="flex flex-col gap-2 p-3 rounded-[12px] bg-white border border-brand-border">
                <div className="flex justify-between">
                    {jobs.length > 0 && <h1 className="text-md font-semibold">Recent Applications</h1>}
                    <Link to='/jobs' className="text-sm font-medium text-brand-blue hover:text-brand-dark duration-200">View all jobs</Link>
                </div>
                {isLoading
                    ? <div className="flex justify-center items-center p-4">
                        <div className="w-10 h-10 border-4 border-brand-border border-t-brand-blue rounded-full animate-spin"></div>
                    </div>
                    : error
                        ? <div className="flex flex-col gap-2 justify-center items-center p-4 font-semibold">
                            <div className="text-md text-brand-slate">Could not load your applications. Please check your connection and try again.</div>
                            <button type="button" onClick={() => fetchJobs()} className="py-2 px-3 rounded-10px text-white hover:text-brand-blue bg-brand-blue hover:bg-brand-border duration-200 cursor-pointer">Try Again</button>
                        </div>
                        : (jobs.length === 0)
                            ? <div className="flex justify-center items-center p-4">
                                <div className="text-md font-semibold text-brand-slate">No recent applications found.</div>
                            </div>
                            : jobs.map(({ id, role, date_applied, status }) => <JobRow key={id} id={id} jobTitle={role} date={date_applied} state={status} />)
                }
            </div>
        </div>
    )
}
