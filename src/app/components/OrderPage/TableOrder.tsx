"use client"
import React, { Fragment, useEffect } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';
import { Menu, Transition } from '@headlessui/react';
import classes from './TableOrder.module.css'
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Order {
    id: string;
    summary: string;
    courseSubject: {
        course: {
            name: string;
            code: string;
            description: string
        };
        subject: {
            name: string;
            code: string;
            description: string;
            price: number
        }
    };
    quantity: number;
    statusOrder: string;
}

export default function TableOrder() {
    const getRowId = (row: Order) => row.id;
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [orderData, setOrderData] = useState<Order[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [orderFiltered, setOrderFiltered] = useState<Order[]>([]);
    const { data: session } = useSession()
    const token = session?.user.accessToken;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/Order/get-all-order-by-admin?pageNumber=0&pageSize=200`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const orderResponse: Order[] = response.data.data.map((item: Order) => ({
                    id: item.id,
                    summary: item.summary,
                    courseName: item.courseSubject.course.name,
                    courseCode: item.courseSubject.course.code,
                    subjectName: item.courseSubject.subject.name,
                    subjectCode: item.courseSubject.subject.code,
                    subjectPrice: item.courseSubject.subject.price,
                    quantity: item.quantity,
                    statusOrder: item.statusOrder,
                }));
                setOrderData(orderResponse);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (statusFilter) {
            const filteredOrders = orderData.filter(order => order.statusOrder === statusFilter);
            setOrderFiltered(filteredOrders);
        } else {
            // Reset filter when statusFilter is null
            setOrderFiltered(orderData);
        }
    }, [statusFilter, orderData]);

    const handleStatusFilterChange = (status: string) => {
        setStatusFilter(status);
    };

    const customCellRenderer = (params: GridRenderCellParams<Order>) => {
        const cellValue = params.value ? params.value : '';

        return (
            <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                {cellValue}
            </div>
        );
    };


    const columns = [
        { field: 'summary', headerName: 'Summary', width: 200, renderCell: customCellRenderer },
        { field: 'courseName', headerName: 'Major Name', width: 200, renderCell: customCellRenderer },
        { field: 'courseCode', headerName: 'Major Code', width: 200, renderCell: customCellRenderer },
        { field: 'subjectName', headerName: 'Subject Name', width: 250, shrink: 1, renderCell: customCellRenderer },
        { field: 'subjectCode', headerName: 'Subject Code', width: 250, shrink: 1, renderCell: customCellRenderer },
        { field: 'subjectPrice', headerName: 'Subject Price', width: 150, renderCell: customCellRenderer },
        { field: 'quantity', headerName: 'Quantity', width: 100, renderCell: customCellRenderer },
        { field: 'statusOrder', headerName: 'Status Order', width: 150, renderCell: customCellRenderer },
        // {
        //   field: 'actions',
        //   headerName: 'Actions',
        //   width: 200,
        //   renderCell: (params: { row: Order }) => (
        //     <div>
        //             <Button variant="text" onClick={() => openDataDialog(params.row as Order)}>
        //                 <VisibilityIcon className='text-[#43BF8E]' />
        //             </Button>
        //             <Button variant="text">
        //                 <Link href={`/student/${params.row.id}`}>
        //                     <ModeEditIcon className='text-[#43BF8E]' />
        //                 </Link>
        //             </Button>
        //             <Button variant="text" onClick={() => openDeleteDialog(params.row as Order)}>
        //                 <DeleteIcon className='text-[#43BF8E]' />
        //             </Button>
        //         </div>
        //   ),
        // },
    ];




    return (
        <div style={{ width: '100%' }}>
            <div className='mb-10'>
                <label htmlFor="statusFilter" className='font-[Belanosima] mr-4'>Filter by Status:</label>
                <select
                    id="statusFilter"
                    name="statusFilter"
                    value={statusFilter || ''}
                    onChange={(e) => handleStatusFilterChange(e.target.value)}
                    className='font-[Belanosima] p-2'
                >
                    <option value="">All</option>
                    <option value="Ordered">Ordered</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <DataGrid
                rows={orderFiltered}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                disableRowSelectionOnClick
                rowHeight={120}
                sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white", paddingLeft:"30px" }}
            />

            {/* Detail Dialog */}
            {/* <StudentDetail
                open={dataDialogOpen}
                onClose={closeDialogs}
                selectedData={selectedUser}
            /> */}

            {/* Confirm delete dialog */}
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >
                <DialogTitle>
                    <h1 className='font-[Belanosima]'>Confirm Delete</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <h1 className='font-[Belanosima]'>Are you sure you want to delete this item?</h1>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} style={{ color: "grey" }}>
                        <p className='font-[Belanosima]'>Cancel</p>
                    </Button>
                    <Button
                        // onClick={() => handleDelete(selectedUser)} 
                        color="error">
                        <p className='font-[Belanosima]'>Delete</p>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
