import React from 'react'
import TableOrder from './TableOrder'

export default function OrderManage() {
  return (
    <div className='container mx-auto' style={{paddingTop: "60px", paddingBottom: "30vh", paddingRight:"100px"  }}>
      <h1 className='flex justify-center font-semibold text-4xl pb-12 font-[Belanosima] text-gray-700'>Order Management</h1>
      <TableOrder/>
    </div>
  )
}
