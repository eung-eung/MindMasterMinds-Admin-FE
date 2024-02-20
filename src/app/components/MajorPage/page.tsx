"use client"
import React, { useState } from 'react'
import TableMajor from './TableMajor'
import classes from './page.module.css'
import MajorCreate from './MajorCreate'

export default function MajorManage() {
  const [eventRefresh, setEventRefresh] = useState<boolean>(false);
    const handleEventRefresh = () => {
        setEventRefresh(prev => !prev)
    }
  return (

    <div className='container mx-auto' style={{paddingTop: "100px", paddingBottom: "40vh", paddingRight:"100px"  }}>
      <div className='flex'>
      <h1 className='flex justify-start font-semibold text-4xl pb-12 font-[Belanosima] text-gray-700'>Major Management</h1>
      <div className={`${classes.serviceActionBtn } justify-end`}>
         <MajorCreate/>
      </div>
      </div>
      <TableMajor/>
    </div>
  )
}
