import { useJobs } from "../context/JobsContext";
import type { Job, JobForm } from "../types/job";
import { supabase } from "../utils/supabase";

export default function useJobsApi() {
    const { dispatch } = useJobs()

    const fetchJobs = async () => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const { data, error } = await supabase.from('jobs').select().order('date_applied', { ascending: false })

            if (error) throw error

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

            if (error) throw error

            dispatch({ type: "ADD_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
            throw error
        }
    }

    const updateJob = async (job: JobForm, jobId: string) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const { data, error } = await supabase.from('jobs').update(job).eq('id', jobId).select().single()

            if (error) throw error

            dispatch({ type: "UPDATE_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
            throw error
        }
    }

    const deleteJob = async (jobId: string) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const { data, error } = await supabase.from('jobs').delete().eq('id', jobId).select().single()
            if (error) throw error

            dispatch({ type: "DELETE_JOB_SUCCESS", payload: data })
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ type: "SET_ERROR", message: error.message })
            }
            throw error
        }
    }

    const fetchJobById = async (jobId: string) : Promise<Job> => {
        const { data, error } = await supabase.from('jobs').select().eq('id', jobId).single()

        if (error) throw error

        return data
    }

    return { fetchJobs, addJob, updateJob, deleteJob, fetchJobById }
}
