import { type CSSProperties, type ReactNode } from 'react'

export default function DetailsCard({ title, content, className = '', style }: { title: string, content?: string, className?: string, style?: CSSProperties }): ReactNode {
    const statusColor = () => {
        if(title !== "Status") return
        switch (content) {
            case 'Applied': 
            case 'Interview':
                return 'text-brand-blue'
            case 'Rejected':
                return 'text-red-800'
            case 'Offer':
                return 'text-green-800'
            default:
                return ''
        }
    }
    return (
        <div className={`p-3 rounded-[12px] text-sm font-normal border border-brand-border bg-white ${className}`} style={style}>
            <span className="text-brand-slate">{title}</span>
            {title === 'Company Website' ? <a href={content} target='_blank' className='block'>{content}</a> : <p className={`${title === 'Status' ? statusColor() + ' font-semibold' : ''}`}>{content}</p>}
        </div>
    )
}
