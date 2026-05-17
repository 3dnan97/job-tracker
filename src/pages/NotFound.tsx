import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="px-6 md:px-[20%] min-h-[400px] flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="text-xl">Sorry, the page you are looking for does not exist. Please check the URL and try again.</p>
            <div className="flex gap-2">
                <Link to={'/'} className="px-3 py-2 md:px-4 rounded-10px font-semibold text-sm text-white bg-brand-blue hover:text-brand-blue hover:bg-brand-border duration-200">Go to Dashboard</Link>
                <Link to={'/jobs'} className="px-3 py-2 md:px-4 rounded-10px font-semibold text-sm bg-white border border-brand-border hover:bg-brand-blue hover:text-white hover:border-brand-blue duration-200">View Jobs</Link>
            </div>
        </div>
    )
}