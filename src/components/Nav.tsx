import { Link } from 'react-router-dom'
import {STRINGS} from '../i18n/strings'
import useAuth from '../hooks/useAuth'
export default function Nav(){
    const {user, signOut} = useAuth()
    return(
        <>
            <nav className="flex justify-between items-center p-4 border-b border-gray-300 rounded-lg">
                <div>{STRINGS.common.appName}</div>
                <div className="flex gap-6 items-center">
                    <ul className="hidden md:flex gap-4">
                        <li>
                            <Link to="/" className="hover:text-black cursor-pointer">{STRINGS.nav.dashboard}</Link>
                        </li>
                        <li>
                            <Link to="/jobs" className="hover:text-black cursor-pointer">{STRINGS.nav.jobs}</Link>
                        </li>
                        <li>
                            {user?.user_metadata.name}
                        </li>
                    </ul>
                    <button 
                        onClick={signOut}
                        className="py-1 px-2 border border-gray-300 rounded-lg hover:bg-blue-900 hover:text-white cursor-pointer">
                        {STRINGS.nav.logout}
                    </button>
                </div>
            </nav>
            <ul className="md:hidden flex gap-4 mt-4 px-4">
                
                <li>
                    <Link to="/">{STRINGS.nav.dashboard}</Link>
                </li>
                <li>
                    <Link to="/jobs">{STRINGS.nav.jobs}</Link>
                </li>
            </ul>
        </>
    )
}