import StudentManage from '@/app/components/StudentPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Student Management'
}
export default function StudenManagement() {
    return (
        <div>
            <StudentManage/>
        </div>
    )
}
