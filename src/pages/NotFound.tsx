import Button from "../components/Button"

export default function NotFound() {
    return (
        <div className="px-6 md:px-[20%] min-h-[400px] flex flex-col gap-4 justify-center items-center text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="text-xl">Sorry, the page you are looking for does not exist. Please check the URL and try again.</p>
            <div className="flex gap-2">
                <Button text="Go to Dashboard" to="/" color="blue"/>
                <Button text="View Jobs" to="/jobs" color="white"/>
            </div>
        </div>
    )
}