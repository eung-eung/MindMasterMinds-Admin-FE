import React from 'react'
import TableSubject from './TableSubject'

export default function SubjectManage() {
  return (
    <div className='container mx-auto' style={{paddingTop: "100px", paddingBottom: "30vh", paddingRight:"100px"  }}>
    <h1 className='flex justify-center font-semibold text-4xl pb-12 font-[Belanosima] text-gray-700'>Subject Management</h1>
    <TableSubject/>
  </div>
  )
}
