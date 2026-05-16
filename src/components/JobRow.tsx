import { type ReactNode } from 'react'
import type { JobStatus } from '../types/job'

export default function JobRow({ jobTitle, date, state }: { jobTitle: string, date: string, state: JobStatus }): ReactNode {
    return (
        <div className="flex justify-between items-center p-2 rounded-10px text-sm bg-brand-light">
            <div className="flex gap-[10px] font-semibold">
                <span>{jobTitle}</span>
                <span className="text-brand-slate">{date}</span>
            </div>
            <span className="text-brand-blue">{state}</span>
        </div>
    )
}
