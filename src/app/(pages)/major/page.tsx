import MajorManage from '@/app/components/MajorPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Major Management'
}
export default function MajorManagement() {
    return (
        <div>
            <MajorManage/>
        </div>
    )
}
