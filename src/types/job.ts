export type JobStatus = 'Applied' | 'Interview' | 'Rejected' | 'Offer'

export type Confidence = 'high' | 'medium' | 'low'

export interface AttachedFile {
    name: string,
    url: string
}

export interface Job {
    id:string;
    user_id:string;
    company:string;
    role:string;
    status:JobStatus;
    confidence?: Confidence;
    date_applied?:string; // ISO 8601 string
    location?:string;
    job_description?:string;
    attached_files?:AttachedFile[];
    notes?:string;
    company_url?:string;
    created_at: string; // ISO 8601 string
    updated_at?: string; // ISO 8601 string
}

export interface JobFilter{
    status?:JobStatus | 'All';
    search?:string
}