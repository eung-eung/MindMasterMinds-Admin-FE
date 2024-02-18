"use client"
import React from 'react'
import TablePost from './TablePost'

export default function PostManage() {
  return (
    <div className='container mx-auto my-auto' style={{paddingTop: "100px", paddingBottom: "30vh", paddingRight:"100px" }}>
    <h1 className='flex justify-center font-semibold text-4xl mb-12 font-[Belanosima] text-[#bfbaba]'>Post Management</h1>
    <TablePost/>
</div>

    
  )
}
