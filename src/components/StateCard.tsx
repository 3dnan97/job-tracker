import type { ReactNode } from "react";

export default function StateCard({ title, count, isLoading }: { title: string, count: number, isLoading: boolean }): ReactNode {
    return (
        <div className="flex-1 p-3 rounded-[12px] bg-white border border-brand-border">
            <p className="text-sm text-brand-slate">{title}</p>
            {isLoading ? <div className="mt-1 h-6 w-6 border-4 border-brand-border border-t-brand-blue rounded-full animate-spin"></div> : <p className="text-2xl font-bold">{count}</p>}
        </div>
    )
}
