import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import JobsProvider from "../context/JobsContext";

export default function ProtectedRoute() {
    const { loading, user } = useAuth()

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            {/* The spinner element */}
            <div className="w-10 h-10 border-4 border-brand-border border-t-brand-blue rounded-full animate-spin"></div>
        </div>
    }
    if (user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
    <JobsProvider>
        <Outlet />
    </JobsProvider>
    )
}