import { useJobs } from "../context/JobsContext";
import type { Job, JobForm } from "../types/job";
import { supabase } from "../utils/supabase";

export default function useJobsApi() {
    const { dispatch } = useJobs()

    const fetchJobs = async () => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const { data, error } = await supabase.from('jobs').select()
            if (error) {
                throw error
            }
            dispatch({ type: 'SET_JOBS_SUCCESS', payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: 'SET_ERROR', message: error.message })
            }
        }
    }

    const addJob = async (job: JobForm) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const { data, error } = await supabase.from('jobs').insert(job).select().single()
            if (error) {
                throw error
            }
            dispatch({ type: "ADD_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
            throw error
        }
    }

    const updateJob = async (job: Job) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const { data, error } = await supabase.from('jobs').update(job).eq('id', job.id).select().single()
            if (error) {
                throw error
            }
            dispatch({ type: "UPDATE_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
        }
    }

    const deleteJob = async (jobId: string) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const { data, error } = await supabase.from('jobs').delete().eq('id', jobId).select().single()
            if (error) {
                throw error
            }
            dispatch({ type: "DELETE_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
        }
    }

    return { fetchJobs, addJob, updateJob, deleteJob }
}
