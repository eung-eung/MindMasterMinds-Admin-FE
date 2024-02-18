"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import PostDetail from './PostDetail';
import Link from 'next/link';


interface Post {
    id: number,
    title: string,
    category: string,
    date: string,
    author: string,
    major: string,
    view: number,
    like: number, 
    content: string,
}

export default function TablePost() {
    const getRowId = (row: Post) => row.id; 
    const [dataDialogOpen, setCagesDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Post | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const openDataDialog = (row: Post) => {
        setSelectedRow(row);
        setCagesDialogOpen(true);
    };

    const closeDialogs = () => {
        setSelectedRow(null);
        setCagesDialogOpen(false);
    };

    const openDeleteDialog = (row: Post) => {
        setSelectedRow(row);
        setDeleteDialog(true);
    };



    const post: Post[] = [
        {
            id: 1,
            title: 'Post 1',
            category: 'News',
            date: '2024-02-07',
            author: 'John Doe',
            major: 'Computer Science',
            view: 3000,
            like:1500, 
            content: "Become the premier connecting platform, making it easy for everyone to access knowledge and a supportive community, thereby unlocking their own potential and contributing to society",
            
        },
        {
            id: 2,
            title: 'Post 2',
            category: 'Sharing',
            date: '2024-02-08',
            author: 'Jane Smith',
            major: 'Engineering',
            view: 1500,
            like:1500, 
            content: "Become the premier connecting platform, making it easy for everyone to access knowledge and a supportive community, thereby unlocking their own potential and contributing to society"
        },
        {
            id: 3,
            title: 'Post 3',
            category: 'Articals',
            date: '2024-02-09',
            author: 'John Doe',
            major: 'Mathematics',
            view: 2000,
            like: 1500, 
            content: "Become the premier connecting platform, making it easy for everyone to access knowledge and a supportive community, thereby unlocking their own potential and contributing to society"
        },
   
        
    ];



    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'author', headerName: 'Author', width: 200 },
        { field: 'major', headerName: 'Major', width: 200 },
        { field: 'view', headerName: 'View', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params : {row: Post}) => (
                <div>
                    <Button variant="text" onClick={() => openDataDialog(params.row)}><VisibilityIcon className='text-[#43BF8E]'/></Button>
                    <Button variant="text" ><Link href={`/post/${params.row.id}`}><ModeEditIcon className='text-[#43BF8E]'/></Link></Button>
                    <Button variant="text" onClick={() => openDeleteDialog(params.row)}><DeleteIcon className='text-[#43BF8E]'/></Button>
                </div>

            ),
        },

    ];


    return (
        <div style={{  width: '100%' }}>
            <DataGrid
                rows={post}
                columns={columns}
                getRowId={getRowId} 
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }, 
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{fontFamily: "Belanosima", fontSize: "17px", backgroundColor:"white"}}
            />

            {/* Detail Dialog */}
            <PostDetail
                open={dataDialogOpen}
                onClose={closeDialogs}
                selectedData={selectedRow}
            />

            {/* Confirm delete dialog */}
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
            >
                <DialogTitle><p className='font-[Belanosima]'>Confirm Delete</p></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <p className='font-[Belanosima]'>Are you sure you want to delete this item?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialog(false)} color="primary">
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
