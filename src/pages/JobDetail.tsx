import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useJobsApi from "../hooks/useJobsApi"
import type { Job } from "../types/job"
import DetailsCard from "../components/DetailsCard"

export default function JobDetail() {
    const { id } = useParams()
    const navigation = useNavigate()
    const { fetchJobById, deleteJob } = useJobsApi()
    const [job, setJob] = useState<Job | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const detailsColumnRef = useRef<HTMLDivElement>(null)
    const [descriptionMaxHeight, setDescriptionMaxHeight] = useState<number | undefined>()
    const [isDesktop, setIsDesktop] = useState<boolean>(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [deletionError, setDeletionError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return
        const jobId = id
        setIsLoading(true)
        async function loadJob() {
            try {
                const fetchedJob = await fetchJobById(jobId)
                setJob(fetchedJob)
            } catch (error) {
                setFetchError('Application not found.')
            } finally {
                setIsLoading(false)
            }
        }
        loadJob()
    }, [id])

    useEffect(() => {
        const detailsColumn = detailsColumnRef.current
        if (!detailsColumn || !isDesktop) {
            setDescriptionMaxHeight(undefined)
            return
        }

        const updateDescriptionHeight = () => {
            setDescriptionMaxHeight(detailsColumn.getBoundingClientRect().height)
        }

        updateDescriptionHeight()
        const resizeObserver = new ResizeObserver(updateDescriptionHeight)
        resizeObserver.observe(detailsColumn)

        return () => resizeObserver.disconnect()
    }, [job, isDesktop])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')
        const updateIsDesktop = () => setIsDesktop(mediaQuery.matches)

        updateIsDesktop()
        mediaQuery.addEventListener('change', updateIsDesktop)

        return () => mediaQuery.removeEventListener('change', updateIsDesktop)
    }, [])

    async function handleDelete(){
        if (!job) return
        setIsDeleting(true)
        try {
            await deleteJob(job.id)
            navigation('/jobs')
        } catch (error) {
            setDeletionError('Something went wrong! please try again.')
        }finally{
            setIsDeleting(false)
        }
    }
    
    return (
        <div className="md:p-4">
            {
                fetchError
                    ? <div className="flex flex-col gap-2 justify-center items-center py-10">
                        <span className="text-2xl font-bold text-brand-slate">
                            {fetchError}
                        </span>
                        <Link to={'/jobs'} className="py-2 px-3 rounded-10px text-semibold text-white bg-brand-blue hover:text-brand-blue hover:bg-brand-border">Back to jobs</Link>
                    </div>
                    : isLoading
                        ? <div className="min-h-[200px] flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-brand-border border-t-brand-blue rounded-full animate-spin"></div>
                        </div>
                        : <div className="flex flex-col gap-2 px-4 md:max-h-[600px] font-semibold">
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="md:flex-3 flex flex-col gap-2">
                                    <h1 className="text-xl md:text-2xl font-bold">{job?.role}</h1>
                                    <p className="text-xs text-brand-slate">{job?.location} &bull; Applied {job?.date_applied}</p>
                                </div>
                                <div className="md:flex-1 flex justify-center items-center md:items-start gap-2">
                                    <Link to={`/jobs/${id}/edit`} className="flex-1 py-2 rounded-10px text-center text-sm border border-brand-border bg-white hover:bg-brand-border duration-200">Edit</Link>
                                    <button type="button" onClick={() => setShowDeleteConfirmation(true)} className="flex-1 py-2 rounded-10px text-center text-sm text-white bg-red-900 hover:bg-red-700 duration-200 cursor-pointer">Delete</button>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div ref={detailsColumnRef} className="flex-5 flex flex-col gap-4">
                                    <div className="flex gap-2">
                                        <DetailsCard title="Status" content={job?.status} className="flex-1" />
                                        <DetailsCard title="Confidence" content={job?.confidence} className="flex-1" />
                                    </div>
                                    <DetailsCard title="Company" content={job?.company} />
                                    <DetailsCard title="Company Website" content={job?.company_url} />
                                    {/* <DetailsCard title="" content={job?.attached_files} /> */}
                                    <DetailsCard title="Notes" content={job?.notes} />
                                </div>
                                <div className="md:flex-4">
                                    {/* TODO: make the job description formating better, for this to happen i think I need to improve it when adding a new job. */}
                                    <DetailsCard
                                        title="Job Description"
                                        content={job?.job_description}
                                        className="md:overflow-y-auto"
                                        style={descriptionMaxHeight ? { maxHeight: descriptionMaxHeight } : undefined}
                                    />
                                </div>
                            </div>
                            {
                                showDeleteConfirmation && job && <div className="fixed inset-0 z-10 flex justify-center items-end md:items-center bg-black/40 px-4 py-6">
                                    <div className="w-full max-w-md flex flex-col gap-3 p-4 rounded-[12px] bg-white border border-brand-border">
                                        <div>
                                            <h2 className="text-lg font-bold">Delete application?</h2>
                                            <p className="mt-1 text-sm text-brand-slate">This will remove <strong className="text-black">{job.role}</strong> at <strong className="text-black">{job.company}</strong> from your tracker.</p>
                                        </div>
                                        { deletionError && <p className="text-sm text-red-600">{deletionError}</p> }
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => setShowDeleteConfirmation(false)} className="flex-1 h-input rounded-10px border border-brand-border hover:bg-brand-border duration-200 cursor-pointer">
                                                Cancel
                                            </button>
                                            <button type="button" onClick={() => handleDelete()} className="flex-1 h-input rounded-10px text-white bg-red-900 hover:bg-red-800 duration-200 disabled:bg-brand-slate cursor-pointer" disabled={isDeleting}>
                                                {isDeleting ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            }
                        </div>
            }
        </div>
    )
}
