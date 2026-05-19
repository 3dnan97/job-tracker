import { type ReactNode } from 'react'
import type { JobStatus } from '../types/job'
import { Link } from 'react-router-dom'

export default function JobRow({ id, jobTitle, date, state }: { id: string, jobTitle: string, date?: string, state: JobStatus }): ReactNode {
    const displayDate = date ?? "No date"

    return (
        <Link to={(`/jobs/${id}`)} className="flex flex-col md:flex-row gap-1 justify-between md:items-center p-2 rounded-10px text-xs md:text-sm bg-brand-light">
            <div className="flex gap-[10px] font-semibold">
                <span>{jobTitle}</span>
                <span className="hidden md:inline text-brand-slate">{displayDate}</span>
            </div>
            <div className="w-full md:w-auto flex justify-between ">
                <span className="md:hidden text-brand-slate">{displayDate}</span>
                <span className="text-brand-blue">{state}</span>
            </div>
        </Link>
    )
}
