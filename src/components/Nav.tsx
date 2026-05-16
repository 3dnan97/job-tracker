import { Link, NavLink } from 'react-router-dom'
import {STRINGS} from '../i18n/strings'
import useAuth from '../hooks/useAuth'
export default function Nav(){   
    const {user, signOut} = useAuth()
    return(
        <div className='md:py-4 md:px-8 md:bg-white md:border-b border-brand-border'>
            <nav className="flex justify-between items-center p-4 md:p-0">
                <Link to='/' className='flex items-center gap-[10px]'>
                    <div className="h-6 w-6 rounded-lg bg-brand-blue"></div>
                    <div className='text-[18px] font-bold'>{STRINGS.common.appName}</div>
                </Link>
                <div className="flex gap-6 items-center">
                    <ul className="hidden md:flex gap-6 font-semibold text-sm text-brand-slate">
                        <li>
                            <NavLink 
                                to="/" 
                                className={({isActive}) => `${isActive ? 'text-brand-dark cursor-default' : 'hover:text-brand-blue duration-200 cursor-pointer'}`}>
                                    {STRINGS.nav.dashboard}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/jobs" 
                                className={({isActive}) => `${isActive ? 'text-brand-dark cursor-default' : 'hover:text-brand-blue duration-200 cursor-pointer'}`}>
                                    {STRINGS.nav.jobs}
                            </NavLink>
                        </li>
                        <li className='cursor-default'>
                            {user?.user_metadata.name}
                        </li>
                    </ul>
                    <button 
                        onClick={signOut}
                        className="py-1 px-2 rounded-lg font-semibold text-[13px] hover:text-white border border-brand-border hover:bg-brand-blue duration-200 cursor-pointer">
                        {STRINGS.nav.logout}
                    </button>
                </div>
            </nav>
            <ul className="flex gap-2 px-4 pb-3 md:hidden">
                <li>
                    <NavLink 
                        to="/" 
                        className={({isActive}) =>`px-3 py-2 rounded-full text-[13px] font-semibold ${isActive ? 'bg-brand-blue text-white' : 'bg-brand-border'}`}>
                            {STRINGS.nav.dashboard}
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/jobs" 
                        className={({isActive}) =>`px-3 py-2 rounded-full text-[13px] font-semibold ${isActive ? 'bg-brand-blue text-white' : 'bg-brand-border'}`}>
                            {STRINGS.nav.jobs}
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}