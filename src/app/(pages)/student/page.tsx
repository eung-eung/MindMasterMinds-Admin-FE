import StudentManage from '@/app/components/StudentPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'User Management'
}
export default function UserManagement() {
    return (
        <div>
            <StudentManage/>
        </div>
    )
}
