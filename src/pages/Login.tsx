import { useNavigate, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState, type SyntheticEvent } from "react"

export default function Login() {
    const [isSignedUp, setIsSignedUp] = useState<boolean>(true)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        email: false,
        password: false,
    })
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const { user, signIn, signUp } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const navigate = useNavigate()

    if (user) {
        return <Navigate to="/" replace />
    }

    async function onFormSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            if (!email.trim() || !password.trim()) {
                setErrorMsg('Please fill all required fields.')
                setFieldErrors({
                    ...fieldErrors,
                    email: !email.trim() ? true : false,
                    password: !password.trim() ? true : false
                })
                return
            }

            if (!isSignedUp) {
                const name = formData.get('name') as string
                if (!name.trim()) {
                    //here will be error message for name telling user empty name field is not allowed
                    setErrorMsg('Please fill all required fields.');
                    setFieldErrors({ ...fieldErrors, name: true })
                    return
                }
                try {
                    const { data, error } = await signUp(name, email, password)
                    if (error) {
                        //sign up failed
                        throw error
                    }

                    if (data.user && data.session === null) {
                        setShowConfirmation(true)
                        setIsSignedUp(true)
                    } else if (data.user && data.session) {
                        await signIn(email, password)
                        navigate('/', { replace: true })
                    }

                } catch (error) {
                    if (error instanceof Error) {
                        setErrorMsg(error?.message)
                    } else {
                        setErrorMsg('Something went wrong. Please try again, if error presist reload the page.')
                    }
                }
            } else {
                try {
                    const { error } = await signIn(email, password)
                    if (error) {
                        // login failed
                        throw error
                    }

                    navigate('/', { replace: true })
                } catch (error) {
                    if (error instanceof Error) {
                        setErrorMsg(error?.message)
                    } else {
                        setErrorMsg('Something went wrong. Please try again, if error presist reload the page.')
                    }
                }
            }
        } finally {
            setIsSubmitting(false)
        }

    }

    return (
        <div className="min-h-screen flex md:items-center md:justify-center">
            <div className="flex md:bg-white w-full md:w-[1000px] md:min-h-[400px] rounded-20px border border-brand-border overflow-hidden">
                <div className="hidden md:flex flex-col justify-between p-[38px] md:w-[46%] bg-brand-blue text-white">
                    <div className="flex flex-col gap-[14px]">
                        <h1 className="text-3xl font-bold">Track your aplications with clarity.</h1>
                        <p className="text-[15px] text-brand-border">Secure per user tracknig, URL filters, and reusable workflows.</p>
                    </div>
                    <p className="text-sm text-brand-border">Job Tracker &bull; React + Supabase </p>
                </div>
                <div className="p-4 w-full md:w-[54%] p-[38px]">
                    <div className="mb-4">
                        <h1 className="text-[34px] font-bold">{isSignedUp ? `Login` : `Sign up`}</h1>
                        <p className="text-sm text-brand-slate">Sign {isSignedUp ? `in` : `up`} to {isSignedUp ? `continue to your dashboard` : `start tracking your jobs`}</p>
                    </div>
                    {showConfirmation
                        ? <div className="flex flex-col items-center text-center gap-4 py-6">
                            <h2 className="text-xl font-bold text-green-600">Check your email!</h2>
                            <p className="text-sm text-brand-slate">
                                We've sent a verification link. Please check your inbox and click the link to activate your account.
                            </p>
                            <button
                                onClick={() => {
                                    setIsSignedUp(true)
                                    setShowConfirmation(false)
                                }}
                                className="w-full bg-brand-border text-brand-dark p-2 rounded-10px font-semibold mt-4 cursor-pointer"
                            >
                                Back to Login
                            </button>
                        </div>
                        : <form onSubmit={onFormSubmit} className="flex flex-col gap-2">
                                <p className="text-red-600">{errorMsg}</p>
                                {!isSignedUp && (<>
                                    <label htmlFor="name" className="text-[13px] font-semibold">Name</label>
                                    <input type="text" name="name" id="name" onFocus={() => setFieldErrors({ ...fieldErrors, name: false })} required className={`bg-white border ${fieldErrors.name ? 'border-red-500' : 'border-brand-border'} rounded-10px h-input px-2`} />
                                </>)}
                                <label htmlFor="email" className="text-[13px] font-semibold">Email</label>
                                <input type="email" name="email" id="email" onFocus={() => setFieldErrors({ ...fieldErrors, email: false })} required className={`bg-white border ${fieldErrors.email ? 'border-red-500' : 'border-brand-border'} rounded-10px h-input px-2`} />
                                <label htmlFor="password" className="text-[13px] font-semibold">Password</label>
                                <input type="password" name="password" id="password" onFocus={() => setFieldErrors({ ...fieldErrors, password: false })} required className={`bg-white border ${fieldErrors.password ? 'border-red-500' : 'border-brand-border'} rounded-10px h-input px-2`} />
                                {isSignedUp ? <p className="">
                                    Don't have an account?
                                    <span role="button" onClick={() => setIsSignedUp(false)} className="mx-1 underline cursor-pointer">
                                        Sign up
                                    </span>
                                    now!
                                </p>
                                    : <p className="mt-4">
                                        Already have an account?
                                        <span role="button" onClick={() => setIsSignedUp(true)} className="mx-1 underline cursor-pointer">
                                            Login
                                        </span>
                                        now!
                                    </p>
                                }
                                <button className={`flex justify-center items-center ${isSubmitting ? "bg-brand-slate cursor-wait" : "bg-brand-blue cursor-pointer"} text-sm font-semibold text-white p-2 rounded-10px h-input`} disabled={isSubmitting} type="submit">
                                    {isSubmitting ? 
                                        <div className="w-7 h-7 border-4 border-brand-border border-t-brand-blue rounded-full animate-spin"></div>
                                        : `Sign ${isSignedUp ? `In` : `Up`}`}
                                </button>
                            </form>
                    }
                </div>
            </div>
        </div>
    )
}