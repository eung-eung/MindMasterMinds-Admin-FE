'use client'

import React from 'react'
import classes from './page.module.css'
import { useRouter } from 'next/navigation'
import LoginIcon from '@mui/icons-material/Login';
import 'react-toastify/dist/ReactToastify.css';
import { signIn, useSession } from 'next-auth/react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import Image from 'next/image';

export default function SignInPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const emailInput = React.useRef<any>()
    const passwordInput = React.useRef<any>()
    const toastId = React.useRef<any>()



    async function handleForm(event: React.FormEvent) {
        event.preventDefault()
        if (!emailInput.current.value || !passwordInput.current.value) return

        toastId.current = toast.loading("Loading...")
        const res = await signIn('credentials', {
            redirect: false,
            username: emailInput.current.value,
            password: passwordInput.current.value,
            callbackUrl: '/'
        });
        console.log('response: ', res);
        if (!res || !res.url) {
            toast.update(toastId.current, {
                render: "Login failed",
                type: "error",
                isLoading: false,
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            return
        }
        else if (res.ok) {
            toast.update(toastId.current, {
                render: "Login successful, Redirecting...",
                type: "success",
                isLoading: false,
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            router.replace(res?.url)

        }

    }
    return (
        <div className='
    container
    mx-auto 
    text-center 
    flex 
    items-center 
    flex-col 
    w-5/6
   
    '
        >
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className={classes.container + ' w-full flex flex-col items-center p-10'}>
                <Image alt='icon' width={100} height={100} src='/images/icon.jpg' />
                <form className='mb-14 xl:w-6/12 lg:w-2/4' onSubmit={handleForm}>
                    <div className='flex flex-col justify-left mb-6'>
                        <label htmlFor='username' className='text-left mb-3 font-medium	'>Username</label>
                        <input
                            ref={emailInput}
                            type='text' id='username'
                            className={classes.form_input}
                            placeholder='Username' />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <label htmlFor='password' className='text-left mb-3 font-medium	'>Password</label>
                        <input
                            ref={passwordInput}
                            type='password' id='password'
                            className={classes.form_input}
                            placeholder='Password' />
                    </div>
                    <button type='submit' className={classes.submit_btn}>
                        <LoginIcon className='mr-4' /> Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
