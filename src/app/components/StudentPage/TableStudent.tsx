"use client"
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import StudentDetail from './StudentDetail';
import Link from 'next/link';


interface Row {
    id: number;
    lastName: string;
    firstName: string;
    yob: number;
    totalFee: number;
    totalCourse: number;
    email: string;
    phoneNum: string;
}

export default function TableStudent() {
    const getRowId = (row: Row) => row.id.toString();
    const [dataDialogOpen, setCagesDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const openDataDialog = (row: Row) => {
        setSelectedRow(row);
        setCagesDialogOpen(true);
    };

    const closeDialogs = () => {
        setSelectedRow(null);
        setCagesDialogOpen(false);
    };

    const openDeleteDialog = (row: Row) => {
        setSelectedRow(row);
        setDeleteDialog(true);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'yob', headerName: 'Year of birth', width: 150 },
        { field: 'totalFee', headerName: 'Total Fees', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNum', headerName: 'Phone number', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: { row: Row }) => (
                <div>
                    <Button variant="text" onClick={() => openDataDialog(params.row as Row)}>
                        <VisibilityIcon className='text-[#43BF8E]' />
                    </Button>
                    <Button variant="text">
                        <Link href={`/student/${params.row.id}`}>
                            <ModeEditIcon className='text-[#43BF8E]' />
                        </Link>
                    </Button>
                    <Button variant="text" onClick={() => openDeleteDialog(params.row as Row)}>
                        <DeleteIcon className='text-[#43BF8E]' />
                    </Button>
                </div>
            ),
        },
    ];

    const rows: Row[] = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', yob: 2000, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', yob: 2001, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', yob: 2002, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 4, lastName: 'Stark', firstName: 'Arya', yob: 1999, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', yob: 1999, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 6, lastName: 'Melisandre', firstName: 'Rossini', yob: 2004, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', yob: 2001, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', yob: 2002, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', yob: 1997, totalCourse: 25, totalFee: 450, email: "abc123@Gmail.com", phoneNum: "0987654321" },
    ];


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }, // Fixed typo here
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white" }}
            />

            {/* Detail Dialog */}
            <StudentDetail
                open={dataDialogOpen}
                onClose={closeDialogs}
                selectedData={selectedRow}
            />

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
                        // onClick={() => handleDelete(selectedRow)} 
                        color="error">
                        <p className='font-[Belanosima]'>Delete</p>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
