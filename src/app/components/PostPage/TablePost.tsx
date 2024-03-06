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
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';
import { redirect } from 'next/navigation';


interface Post {
    id: string,
    content: string,
    image: string,
    creationDate: string,
    user: {
        firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    userRole: {
        roleName: string
    },
    },
    
}

export default function TablePost() {
    const getRowId = (row: Post) => row.id;
    const [dataDialogOpen, setCagesDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Post | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [post, setPost] = useState<Post[]>([]);

    const { data: session, status } = useSession()
    const token = session?.user.accessToken;

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/Post?pageNumber=0&pageSize=200`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const postData: Post[] = response.data.data;
                
                // Extracting firstName and lastName from user object for each post
                const formattedData = postData.map((item: Post) => ({
                    ...item,
                    creationDate: formatDate(item.creationDate),
                    name: item.user.firstName + item.user.lastName,
                    firstName: item.user.firstName,
                    lastName: item.user.lastName,
                    roleName: item.user.userRole.roleName
                }));
                setPost(formattedData);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    },[]);

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






    const columns = [
        // { field: 'id', headerName: 'ID', width: 150 },
        {
            field: 'image', headerName: 'Image', width: 200, renderCell: (params: { row: Post }) => (
                <div>
                    {params.row.image ?
                        <img
                            src={params.row.image}
                            alt="post_image"
                            style={{ height: "80px", objectFit: "cover", width: "130px" }}  
                        />
                        : ""}
                </div>

            ),
        },
        { field: 'creationDate', headerName: 'Creation Date', width: 180 },
        { field: 'content', headerName: 'Content', width: 350 },
        { field: 'name', headerName: 'Author name', width: 200 },
        { field: 'roleName', headerName: 'Author role', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: { row: Post }) => (
                <div>
                    <Button variant="text" onClick={() => openDataDialog(params.row)}><VisibilityIcon className='text-[#43BF8E]' /></Button>
                    <Button variant="text" ><Link href={`/post/${params.row.id}`}><ModeEditIcon className='text-[#43BF8E]' /></Link></Button>
                    <Button variant="text" onClick={() => openDeleteDialog(params.row)}><DeleteIcon className='text-[#43BF8E]' /></Button>
                </div>

            ),
        },

    ];


    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={post}
                columns={columns}
                getRowId={getRowId}
                rowHeight={100}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
                disableRowSelectionOnClick
                sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white",paddingLeft:"30px" }}
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
