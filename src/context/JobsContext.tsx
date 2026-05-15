import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import type { Job } from "../types/job";

interface JobsState {
    jobs: Job[];
    isLoading: boolean;
    error: string | null;
}

interface SetLoadingAction {
    type: 'SET_LOADING'
}

interface SetJobsSuccessAction {
    type: 'SET_JOBS_SUCCESS';
    payload: Job[];
}

interface AddJobSuccessAction {
    type: 'ADD_JOB_SUCCESS';
    payload: Job;
}

interface UpdateJobSuccessAction {
    type: 'UPDATE_JOB_SUCCESS';
    payload: Job;
}

interface DeleteJobSuccessAction {
    type: 'DELETE_JOB_SUCCESS';
    payload: Job;
}

interface SetErrorAction {
    type: 'SET_ERROR';
    message: string;
}

type JobsAction =
    | SetLoadingAction
    | SetJobsSuccessAction
    | AddJobSuccessAction
    | UpdateJobSuccessAction
    | DeleteJobSuccessAction
    | SetErrorAction

function jobsReducer(state: JobsState, action: JobsAction): JobsState {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case "SET_JOBS_SUCCESS":
            return {
                jobs: action.payload,
                isLoading: false,
                error: null,
            }
        case "ADD_JOB_SUCCESS":
            return {
                jobs: [...state.jobs, action.payload],
                isLoading: false,
                error: null,
            }
        case "UPDATE_JOB_SUCCESS":
            return {
                jobs:state.jobs.map(job => job.id === action.payload.id ? action.payload : job),
                isLoading: false,
                error: null,
            }
        case "DELETE_JOB_SUCCESS":
            return {
                jobs: state.jobs.filter(job => job.id !== action.payload.id),
                isLoading: false,
                error: null,
            }
        case "SET_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.message
            }
    }
}

type JobsContextValue = {
    state: JobsState;
    dispatch: Dispatch<JobsAction>
}

const JobsContext = createContext<JobsContextValue | undefined>(undefined)

export default function JobsProvider({ children }: { children: ReactNode }) {
    const initialState: JobsState = { jobs: [], isLoading: false, error: null }
    const [state, dispatch] = useReducer(jobsReducer, initialState)
    return (
        <JobsContext.Provider value={{state, dispatch}}>
            {children}
        </JobsContext.Provider>
    )
}

export function useJobs() {
    const context = useContext(JobsContext)
    if(context === undefined) {
        throw new Error('useJobs must be used within a JobsProvider')
    }
    return context
}
