import PostManage from '@/app/components/PostPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Post Management"
}
export default function PostManagement() {
    return (
        <div>
            <PostManage/>
        </div>
    )
}
