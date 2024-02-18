import TutorManage from '@/app/components/TutorPage/page'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
    title: 'Tutor Management'
}
export default function TutorManagement() {
    return (
        <div>
            <TutorManage/>
        </div>
    )
}
