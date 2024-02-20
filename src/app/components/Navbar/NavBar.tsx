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
import Header from "../Header/Header";
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
                <>
                    <Header />
                    <div className={classes.nav_links}>
                        <div className={classes.user_container}>
                            <img className={classes.avatar} src={session?.user.userViewLogin.avatar} />
                            <div className={classes.user_detail}>
                                <p>{session?.user.userViewLogin.firstName
                                    + ' '
                                    + session?.user.userViewLogin.lastName}
                                </p>
                                <p className={classes.role}>{session?.user.userViewLogin.userRole.roleName}</p>
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
                            Student
                        </Link>

                        <Link
                            className={router == '/tutor' ? classes.active : ''}
                            href="/tutor">
                            <CameraIcon className={classes.nav_icon}
                            />
                            Tutor
                        </Link>

                        <Link
                            className={router == '/post' ? classes.active : ''}
                            href="/post">
                            <ListAltIcon className={classes.nav_icon}
                            />
                            Post
                        </Link>
                        <div className={classes.logout} onClick={handleLogOut}>
                            <LogoutIcon className={classes.nav_icon} /> Logout
                        </div>

                    </div>

                </>
            }


        </>
    )
}