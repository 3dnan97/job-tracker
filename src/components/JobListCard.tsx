import { type ReactNode } from 'react'
import type { Job } from '../types/job'
import { Link } from 'react-router-dom'

export default function JobListCard({ job }: { job: Job }): ReactNode {
    const { id, company, role, status, date_applied, location } = job
    const statusStyle = () => {
        switch (status) {
            case 'Rejected':
                return 'text-red-800 bg-red-50 border-red-100'
            case 'Offer':
                return 'text-green-800 bg-green-50 border-green-100'
            case 'Interview':
                return 'text-brand-blue bg-brand-border border-brand-border'
            default:
                return 'text-brand-blue bg-brand-border/60 border-brand-border'
        }
    }

    function formattedDate(): string {
        if (!date_applied) return 'No Date'
        const months: Record<string, string> = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }

        const date = date_applied.split('-')

        return `${date[2]} ${months[date[1]]} ${date[0]}`
    }

    return (
        <Link to={id} className='flex flex-col gap-1 justify-center p-3 rounded-10px text-sm hover:shadow-sm bg-brand-light hover:bg-brand-light/70 duration-200 border border-brand-border'>
            <div className="flex justify-between mb-1 text-xs">
                <p className="text-brand-slate">{company}</p>
                <div className={`py-1 px-2 border ${statusStyle()} rounded-full`}>{status}</div>
            </div>
            <h2 className="font-semibold">{role}</h2>
            <div className="flex justify-between text-brand-slate">
                <p>Applied {formattedDate()}</p>
                <p className="">{location || 'No Location'}</p>
            </div>
            <div className='self-start mt-1 rounded-10px text-brand-blue hover:text-brand-blue/70 font-semibold duration-200'>More details</div>
        </Link>
    )
}
