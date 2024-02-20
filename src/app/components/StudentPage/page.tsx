import React from 'react'
import TableStudent from './TableStudent'

export default function StudentManage() {
  return (
    <div className='container mx-auto' style={{paddingTop: "60px", paddingBottom: "30vh", paddingRight:"100px"  }}>
      <h1 className='flex justify-center font-semibold text-4xl pb-12 font-[Belanosima] text-gray-700'>User Management</h1>
      <TableStudent/>
    </div>
  )
}
