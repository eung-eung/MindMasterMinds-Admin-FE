import SubjectManage from '@/app/components/SubjectPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Subject Management'
}
export default function SubjectManagement() {
    return (
        <div>
            <SubjectManage/>
        </div>
    )
}
