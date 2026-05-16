import { Link } from "react-router-dom";
import StateCard from "../components/StateCard";
import JobRow from "../components/JobRow";

export default function Dashboard(){
    return(
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
                    <StateCard title="Applied" count={10} />
                    <StateCard title="Interview" count={1} />
                </div>
                <div className="flex md:flex-1 gap-2">
                    <StateCard title="Offers" count={0} />
                    <StateCard title="Rejected" count={15} />
                </div>
            </div>
            <Link to="/jobs/new" className="flex md:hidden justify-center items-center h-input rounded-10px text-sm font-semibold text-white bg-brand-blue">
                + Add Job
            </Link>
            <div className="flex flex-col gap-2 p-3 rounded-[12px] bg-white border border-brand-border">
                <div className="flex justify-between">
                    <h1 className="text-md font-semibold">Recent Applictions</h1>
                    <Link to='/jobs' className="text-sm font-medium text-brand-blue hover:text-brand-dark duration-200">View all jobs</Link>
                </div>
                <JobRow jobTitle="Frontend Engineer" date="May 10" state="Applied" />
                <JobRow jobTitle="Fullstack Engineer" date="May 10" state="Offer" />
            </div>
        </div>
    )
}