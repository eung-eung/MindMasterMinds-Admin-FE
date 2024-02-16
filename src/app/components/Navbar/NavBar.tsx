'use client'
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraIcon from '@mui/icons-material/Camera';
import LogoutIcon from '@mui/icons-material/Logout';
import classes from './navbar.module.css'
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function Navbar() {
    const { data: session, status } = useSession()
    const router = usePathname()



    const handleLogOut = async (e: React.MouseEvent) => {
        e.preventDefault()
        const data = await signOut({ redirect: true, callbackUrl: '/signIn' })
    }

    return (
        <>
            {!session && status === 'unauthenticated' ? '' :
                <div className={classes.nav_links}>
                    <div className={classes.user_container}>
                        <img className={classes.avatar} src='/images/icon.jpg' />
                        <div className={classes.user_detail}>
                            <p>{session?.user.userViewLogin.firstName
                                + ' '
                                + session?.user.userViewLogin.lastName}
                            </p>
                            <p>{session?.user.userViewLogin.userRole.roleName}</p>
                        </div>
                    </div>
                    <Link
                        className={router == '/dashboard' || router == '/' ? classes.active : ''}
                        href="/dashboard">
                        <DashboardIcon
                            className={classes.nav_icon}
                        /> Dashboard
                    </Link>

                    <Link
                        className={router == '/student' ? classes.active : ''}
                        href="/student"
                    >
                        <AccountCircleIcon
                            className={classes.nav_icon}
                        />
                        Student Management
                    </Link>

                    <Link
                        className={router == '/tutor' ? classes.active : ''}
                        href="/tutor">
                        <CameraIcon className={classes.nav_icon}
                        />
                        Tutor Management
                    </Link>

                    <Link
                        className={router == '/post' ? classes.active : ''}
                        href="/post">
                        <ListAltIcon className={classes.nav_icon}
                        />
                        Post Management
                    </Link>
                    <div className={classes.logout} onClick={handleLogOut}>
                        <LogoutIcon className={classes.nav_icon} /> Logout
                    </div>
                </div>
            }


        </>
    )
}