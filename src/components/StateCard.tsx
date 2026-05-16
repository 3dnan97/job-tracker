import type { ReactNode } from "react";

export default function StateCard({ title, count }: { title: string, count: number }): ReactNode {
    return (
        <div className="flex-1 p-3 rounded-[12px] bg-white border border-brand-border">
            <p className="text-sm text-brand-slate">{title}</p>
            <p className="text-2xl font-bold">{count}</p>
        </div>
    )
}
