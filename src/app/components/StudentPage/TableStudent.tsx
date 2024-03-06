"use client"
import React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import StudentDetail from './StudentDetail';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';


interface User {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userRole : {
        roleName: string
    }
}



export default function TableStudent() {
    const getRowId = (row: User) => row.id;
    const [dataDialogOpen, setCagesDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [userData, setUserData] = useState<User[]>([]);

    const { data: session, status } = useSession()
    const token = session?.user.accessToken;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/User/get-all-user-by-admin?pageNumber=0&pageSize=200`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const userResponse: User[] = response.data.data.map((item: User) => ({
                    id: item.id,
                    avatar: item.avatar,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    roleName: item.userRole.roleName
                }));
                setUserData(userResponse);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    },[]);

    const openDataDialog = (row: User) => {
        setSelectedUser(row);
        setCagesDialogOpen(true);
    };

    const closeDialogs = () => {
        setSelectedUser(null);
        setCagesDialogOpen(false);
    };

    const openDeleteDialog = (row: User) => {
        setSelectedUser(row);
        setDeleteDialog(true);
    };

    const customCellRenderer = (params: GridRenderCellParams<User>) => {
        const cellValue = params.value ? params.value : '';
      
        return (
          <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
            {cellValue}
          </div>
        );
      };

    const columns = [
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 200,
            renderCell: (params: { row: User }) => (
                <div>
                    {params.row.avatar ?
                        <img
                            src={params.row.avatar}
                            alt="avatar_image"
                            style={{ height: "100px", objectFit: "cover", width: "100px" }}
                        />
                        : ""}
                </div>
            ),
        },
        { field: 'firstName', headerName: 'First name', width: 150, renderCell: customCellRenderer },
        { field: 'lastName', headerName: 'Last name', width: 150, renderCell: customCellRenderer },
        { field: 'email', headerName: 'Email', width: 300, renderCell: customCellRenderer },
        { field: 'phoneNumber', headerName: 'Phone number', width: 150, renderCell: customCellRenderer },
        { field: 'roleName', headerName: 'Role', width: 150, renderCell: customCellRenderer },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: { row: User }) => (
                <div>
                    <Button variant="text" onClick={() => openDataDialog(params.row as User)}>
                        <VisibilityIcon className='text-[#43BF8E]' />
                    </Button>
                    <Button variant="text">
                        <Link href={`/student/${params.row.id}`}>
                            <ModeEditIcon className='text-[#43BF8E]' />
                        </Link>
                    </Button>
                    <Button variant="text" onClick={() => openDeleteDialog(params.row as User)}>
                        <DeleteIcon className='text-[#43BF8E]' />
                    </Button>
                </div>
            ),
        },
    ];

  

    return (
        <div style={{  width: '100%' }}>
            <DataGrid
                rows={userData}
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
                sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white" , paddingLeft:"30px"}}
            />

            {/* Detail Dialog */}
            <StudentDetail
                open={dataDialogOpen}
                onClose={closeDialogs}
                selectedData={selectedUser}
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
                        // onClick={() => handleDelete(selectedUser)} 
                        color="error">
                        <p className='font-[Belanosima]'>Delete</p>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
