import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { JobForm } from "../types/job";
import useJobsApi from "../hooks/useJobsApi";
import useAuth from "../hooks/useAuth";

export default function JobForm() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { addJob, fetchJobById, updateJob } = useJobsApi()
    const [error, setError] = useState<string | null>(null)
    const { id } = useParams()
    const isEditMode = Boolean(id)
    const [fetchError, setFetchError] = useState<string | null>(null)

    const [job, setjob] = useState<JobForm>({
        user_id: '',
        company: '',
        role: '',
        status: '',
        confidence: '',
        date_applied: '',
        location: '',
        job_description: '',
        attached_files: [],
        notes: '',
        company_url: '',
    })

    useEffect(() => {
        async function loadJob() {
            if (!id) return
            try {
                const editableJob = await fetchJobById(id)
                setjob(editableJob)
            } catch (error) {
                setFetchError('Application not found.')
            }
        }
        loadJob()
    }, [id])


    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target

        setjob(prev => ({
            ...prev,
            [name]: value
        }))
    }
    async function onFormSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault()
        const { role, company, status } = job
        if (!role || !company || !status) {
            setError('All required filed must be filled.')
            return
        }
        const jobToSubmit = { ...job }

        if (!jobToSubmit.date_applied) {
            jobToSubmit.date_applied = new Date().toISOString()
        }

        if (user) {
            jobToSubmit.user_id = user.id
        }
        try {
            isEditMode ? await updateJob(job, id) : await addJob(jobToSubmit)
            navigate(isEditMode ? '/jobs' : '/')

        } catch (err) {
            setError('An error occurred. Please reload the page and try again!')
        }
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit' : 'Add New'} Job</h1>
            {fetchError
                ? <div className="flex flex-col gap-2 justify-center items-center py-10">
                    <span className="text-2xl font-bold text-brand-slate">
                        {fetchError}
                    </span>
                    <Link to={'/jobs'} className="py-2 px-3 rounded-10px text-semibold text-white bg-brand-blue hover:text-brand-blue hover:bg-brand-border">Back to jobs</Link>
                </div>
                : <form onSubmit={onFormSubmit} className="flex flex-col gap-2 p-3 rounded-[12px] border border-brand-border bg-white">
                    <label htmlFor="role" className="font-semibold">Role / Job Title <span className="text-red-600">*</span></label>
                    <input type="text" name="role" id="role" onChange={handleChange} value={job.role} required placeholder="Frontend Developer" className="h-input px-2 rounded-10px border border-brand-border" />

                    <label htmlFor="company" className="font-semibold">Company <span className="text-red-600">*</span></label>
                    <input type="text" name="company" id="company" onChange={handleChange} value={job.company} required placeholder="Acme GmbH" className="h-input px-2 rounded-10px border border-brand-border" />

                    <div className="flex gap-2">
                        <div className="flex-3 md:flex-1">
                            <label htmlFor="status" className="font-semibold">Status <span className="text-red-600">*</span></label>
                            <select name="status" id="status" onChange={handleChange} value={job.status} required className="block w-full h-input px-2 mt-2 rounded-10px border border-brand-border">
                                <option value="" disabled>Choose status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Offer">Offer</option>
                            </select>
                        </div>
                        <div className="flex-4 md:flex-1">
                            <label htmlFor="confidence" className="font-semibold">Confidence</label>
                            <select name="confidence" id="confidence" onChange={handleChange} value={job.confidence} className="block w-full h-input px-2 mt-2 rounded-10px border border-brand-border">
                                <option value="">Choose confidence</option>
                                <option value="high">high</option>
                                <option value="medium">medium</option>
                                <option value="low">low</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label htmlFor="date_applied" className="font-semibold">Date</label>
                            <input type="date" name="date_applied" id="date_applied" onChange={handleChange} value={job.date_applied} className="h-input w-full px-2 mt-2 rounded-10px border border-brand-border" />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="location" className="font-semibold">Location</label>
                            <input type="text" name="location" id="location" onChange={handleChange} value={job.location} placeholder="Berlin, Remote" className="h-input w-full px-2 mt-2 rounded-10px border border-brand-border" />
                        </div>
                    </div>

                    <label htmlFor="job_description" className="font-semibold">Job Describtion</label>
                    <textarea name="job_description" id="job_description" onChange={handleChange} value={job.job_description} placeholder="Paste the job description or key requirements here" className="min-h-[calc(2*var(--spacing-input))] px-2 rounded-10px border border-brand-border" />

                    <label htmlFor="company_url" className="font-semibold">Company Webiste link</label>
                    <input type="text" name="company_url" id="company_url" onChange={handleChange} value={job.company_url} placeholder="https://company.com/careers" className="h-input w-full px-2 rounded-10px border border-brand-border" />

                    <label htmlFor="notes" className="font-semibold">Additional Notes</label>
                    <textarea name="notes" id="notes" onChange={handleChange} value={job.notes} placeholder="Recruiter name, follow-up date, salary range, or anything useful" className="min-h-[calc(2*var(--spacing-input))] px-2 rounded-10px border border-brand-border" />

                    {!isEditMode && <>
                        <label htmlFor="attached_files" className="font-semibold">Attachment <small className="ms-1 text-[10px] font-normal text-brand-slate">(e.g. the cv and cover letter you applied with)</small></label>
                        <div className="flex flex-col gap-0">
                            <input type="file" multiple name="attached_files" id="attached_files" onChange={handleChange} className=" h-input px-2 rounded-10px border border-brand-border" />
                            <small className="text-[10px] text-yellow-700 ms-1">The files should be max. 0.5MB</small>
                        </div>
                    </>}

                    <p className="text-sm text-red-600">{error}</p>
                    <div className="flex md:justify-end gap-2 font-semibold">
                        <Link to={'/'} className="flex-1 md:flex-0 md:px-[14px] flex justify-center items-center h-input rounded-10px border border-brand-border">Cancel</Link>
                        <button type="submit" className="flex-1 md:flex-0 md:px-[14px] h-input rounded-10px border border-brand-blue text-white whitespace-nowrap bg-brand-blue cursor-pointer">
                            Save {isEditMode ? 'Changes' : 'Job'}
                        </button>
                    </div>
                </form>}
        </div>
    )
}
