import DashBoardPage from '@/app/components/DashboardPage/page'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: 'Dashboard'
}
export default function Dashboard() {
    return (
        <div >
            <DashBoardPage/>
        </div>
    )
}
