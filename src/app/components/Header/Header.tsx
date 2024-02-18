'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import classes from './Header.module.css'
import NotificationStack from './NotificationStack'
import Link from 'next/link'

type NavigationItem = {
    name: string;
    href: string;
    current: boolean;
}

// const navigation: NavigationItem[] = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
// ]



export default function Header() {
    return (
        <Disclosure as="nav" className="bg-[#FFFFFF] ml-[15%] w-auto">
            <>
                <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8" >
                    <div className="relative flex h-16 items-center justify-between">

                        {/* Search bar */}
                        {/* <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
                                <div className="inline-block">
                                    <div className="inline-flex items-center max-w-full">
                                        <button className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1 py-1" type="button">
                                            <div className="block flex-grow flex-shrink overflow-hidden text-white">Start your search</div>
                                            <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                                                <svg
                                                    viewBox="0 0 32 32"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    focusable="false"
                                                    className={classes.search}
                                                >
                                                    <g fill="none">
                                                        <path
                                                            d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* end search */}

                        <div className="hidden sm:ml-6 sm:block flex items-center justify-center flex-grow" >
                            <h1 className={`${classes.webName} flex justify-center font-semibold`}>
                                <Link href="/dashboard">MindMasterminds</Link> 
                                </h1>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">    
                            <NotificationStack/>
                        </div>
                    </div>
                </div>

               
            </>
        </Disclosure>
    )
}
