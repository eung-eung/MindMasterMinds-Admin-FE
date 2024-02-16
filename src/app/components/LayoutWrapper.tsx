
'use client'
import { useSession } from 'next-auth/react'
import Navbar from './Navbar/NavBar'
import { useEffect, useState } from 'react'
import LoadingTheme from './loadingTheme/loadingTheme'




export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (status !== 'loading') setLoading(false)
    }, [status])
    return (
        <html lang="en">
            <head>

            </head>
            <body>
                {
                    isLoading ? <LoadingTheme /> : <>
                        <Navbar />
                        <div style={{ marginLeft: '15%', paddingLeft: '5%' }}>
                            {children}
                        </div>
                    </>
                }

            </body>
        </html>
    )
}
