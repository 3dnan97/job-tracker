import { Outlet } from "react-router-dom"
import Nav from "./Nav"
export default function Layout(){
    return(
        <div className="flex flex-col md:items-center md:justify-center min-h-screen">
            <div className="md:w-[1000px] md:border border-brand-border rounded-20px overflow-hidden">
                <Nav />
                <Outlet />
            </div>
        </div>
    )
}