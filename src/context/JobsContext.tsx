import React, { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
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

interface SetErrorAction {
    type: 'SET_ERROR';
    message: string;
}

type JobsAction =
    | SetLoadingAction
    | SetJobsSuccessAction
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
