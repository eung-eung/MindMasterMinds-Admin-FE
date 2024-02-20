import OrderManage from '@/app/components/OrderPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Order Management"
}
export default function OrderManagement() {
    return (
        <div>
            <OrderManage/>
        </div>
    )
}
