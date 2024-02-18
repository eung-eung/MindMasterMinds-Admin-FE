"use client"
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'; 
import { DialogActions, DialogContentText } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import TutorDetail from './TutorDetail';
import Link from 'next/link';



interface Tutor {
    id: number;
    rate: string;
    numOfClass: number;
    imagePath: string;
    firstName: string;
    lastName: string;
    revenue: number;
    major: string;
   
}
interface TableTutorProps {
    eventRefresh: boolean;
  }

export default function TableTutor({ eventRefresh }: TableTutorProps) {
    const getRowId = (row: Tutor) => row.id;
    const [dataDialogOpen, setCagesDialogOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<Tutor | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);



    const openDataDialog = (row: Tutor) => {
        setSelectedRow(row);
        setCagesDialogOpen(true);
    };

    const closeDialogs = () => {
        setSelectedRow(null);
        setCagesDialogOpen(false);
    };

    const openDeleteDialog = (row: Tutor) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };



    const tutor: Tutor[] = [
        { id: 1, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/6181/1ae8/89b0660d6dd91bdedba586139a98a0fe?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dcar9Uyk96l2jpeTh2G6LaJt7V5gXJFk7gwxFXMec4JELFGSF8WvJm7gj~KmJh0u24qRFGSeo9qzVKVjNjfGK9V1R~6X8MclhaxavpFdUrxZUx7EAcibCZyMarwVSpLE5NtAOTFoFNsoHNUT~rm15LQuIQ2IDkHX9CQMCmmc~JltROwYdkvxWuffL6-I3TRyMVMZvq92cxBOlaVaMJorSIlqcSSnZOmk6L6PT3FfjrP19PRTh9S38DxgXq641FaK-gJSw-hFc2-min3OEZS9kYtIivRU1QH6rnGcZ~3M8AAyhoBXrtVQIgXBu0-k1OGeOIk4LgNqEP1PGp9ZPPc8rw__', firstName: 'Adrian',lastName: "Bui" ,revenue: 1200, major: "Digital Marketing" },
        { id: 2, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/ebc8/a27e/c8984d41c8d22ee5e1e8af38f1f4da8f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JAH8eY24Gv~kbGclnARIWS0oLf-1tlpzrTXQZ9uvaQMV2sq6RRP61zDRWNwSLUE-A11AdcTgy3BQAKEmEmG-VZ49RrPk8HCz6Hj2FlLyTgrW0nfFoGNh5swFTofOn3fVJsyvdcn86RKaKhDyBzt1EVOIGV60y2cWSdLqFuhaOJfRoP9Kw5EJevVQmrHZxqQ9Cj7a4bzKqIx3Ih931YFnbftvYVorDYbgs3h55TPHx8T2SztYNnG~xbNOR3Fi1zIaLo7u94WQDoL2DtvrJwLTBXLgnDUeTnKf7qiQUu6vT3mEx29H40ZjAxSlKgYyxlIdpfZBT3hRF9q0uMmAWssf3Q__', firstName: 'Mary',lastName: "Han" , revenue: 900, major: "International Business" },
        { id: 3, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/f1fd/d656/07eef0d4abb2a99c5ad961bcffc81c5f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DcmWE0ZteAh6chYldsatebsDACUBGOVxHuEJgfizFf4y2dfg5yZZP8bMGSRniIce3yIYjHbjsxfDRd-tIV6SOhST5jK9BTZl0RDimGWp6mE0UhyxVtI7W1o9WulaYK4Ei8xl-OBRgxYFSO-OK8qmj9BQmxOlK-xURrONm19cDfWYxyZ7t36qMmspJltIy1J8vMHptYmrxQfdI7CMoeDaOpBlwhjRjA9pQ8sOnyhGYnwCSa78~absnhWUt71onxabTlIRBV39fT3IBPePLv6EdjY7-U~TNz3~Yb1Da85VutnwJvRxJ9MYO4J9jpFiP32N3UCIBGobfvtsGLDeOPxMdA__', firstName: 'Dino',lastName: "Phi", revenue: 700, major: "Software Engineering" },
        { id: 4, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/6181/1ae8/89b0660d6dd91bdedba586139a98a0fe?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dcar9Uyk96l2jpeTh2G6LaJt7V5gXJFk7gwxFXMec4JELFGSF8WvJm7gj~KmJh0u24qRFGSeo9qzVKVjNjfGK9V1R~6X8MclhaxavpFdUrxZUx7EAcibCZyMarwVSpLE5NtAOTFoFNsoHNUT~rm15LQuIQ2IDkHX9CQMCmmc~JltROwYdkvxWuffL6-I3TRyMVMZvq92cxBOlaVaMJorSIlqcSSnZOmk6L6PT3FfjrP19PRTh9S38DxgXq641FaK-gJSw-hFc2-min3OEZS9kYtIivRU1QH6rnGcZ~3M8AAyhoBXrtVQIgXBu0-k1OGeOIk4LgNqEP1PGp9ZPPc8rw__', firstName: 'Adrian',lastName: "Bui" ,revenue: 1200, major: "Digital Marketing" },
        { id: 5, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/ebc8/a27e/c8984d41c8d22ee5e1e8af38f1f4da8f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JAH8eY24Gv~kbGclnARIWS0oLf-1tlpzrTXQZ9uvaQMV2sq6RRP61zDRWNwSLUE-A11AdcTgy3BQAKEmEmG-VZ49RrPk8HCz6Hj2FlLyTgrW0nfFoGNh5swFTofOn3fVJsyvdcn86RKaKhDyBzt1EVOIGV60y2cWSdLqFuhaOJfRoP9Kw5EJevVQmrHZxqQ9Cj7a4bzKqIx3Ih931YFnbftvYVorDYbgs3h55TPHx8T2SztYNnG~xbNOR3Fi1zIaLo7u94WQDoL2DtvrJwLTBXLgnDUeTnKf7qiQUu6vT3mEx29H40ZjAxSlKgYyxlIdpfZBT3hRF9q0uMmAWssf3Q__', firstName: 'Mary',lastName: "Han" , revenue: 900, major: "International Business" },
        { id: 6, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/f1fd/d656/07eef0d4abb2a99c5ad961bcffc81c5f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DcmWE0ZteAh6chYldsatebsDACUBGOVxHuEJgfizFf4y2dfg5yZZP8bMGSRniIce3yIYjHbjsxfDRd-tIV6SOhST5jK9BTZl0RDimGWp6mE0UhyxVtI7W1o9WulaYK4Ei8xl-OBRgxYFSO-OK8qmj9BQmxOlK-xURrONm19cDfWYxyZ7t36qMmspJltIy1J8vMHptYmrxQfdI7CMoeDaOpBlwhjRjA9pQ8sOnyhGYnwCSa78~absnhWUt71onxabTlIRBV39fT3IBPePLv6EdjY7-U~TNz3~Yb1Da85VutnwJvRxJ9MYO4J9jpFiP32N3UCIBGobfvtsGLDeOPxMdA__', firstName: 'Dino',lastName: "Phi", revenue: 700, major: "Software Engineering" },
        { id: 7, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/6181/1ae8/89b0660d6dd91bdedba586139a98a0fe?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dcar9Uyk96l2jpeTh2G6LaJt7V5gXJFk7gwxFXMec4JELFGSF8WvJm7gj~KmJh0u24qRFGSeo9qzVKVjNjfGK9V1R~6X8MclhaxavpFdUrxZUx7EAcibCZyMarwVSpLE5NtAOTFoFNsoHNUT~rm15LQuIQ2IDkHX9CQMCmmc~JltROwYdkvxWuffL6-I3TRyMVMZvq92cxBOlaVaMJorSIlqcSSnZOmk6L6PT3FfjrP19PRTh9S38DxgXq641FaK-gJSw-hFc2-min3OEZS9kYtIivRU1QH6rnGcZ~3M8AAyhoBXrtVQIgXBu0-k1OGeOIk4LgNqEP1PGp9ZPPc8rw__', firstName: 'Adrian',lastName: "Bui" ,revenue: 1200, major: "Digital Marketing" },
        { id: 8, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/ebc8/a27e/c8984d41c8d22ee5e1e8af38f1f4da8f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JAH8eY24Gv~kbGclnARIWS0oLf-1tlpzrTXQZ9uvaQMV2sq6RRP61zDRWNwSLUE-A11AdcTgy3BQAKEmEmG-VZ49RrPk8HCz6Hj2FlLyTgrW0nfFoGNh5swFTofOn3fVJsyvdcn86RKaKhDyBzt1EVOIGV60y2cWSdLqFuhaOJfRoP9Kw5EJevVQmrHZxqQ9Cj7a4bzKqIx3Ih931YFnbftvYVorDYbgs3h55TPHx8T2SztYNnG~xbNOR3Fi1zIaLo7u94WQDoL2DtvrJwLTBXLgnDUeTnKf7qiQUu6vT3mEx29H40ZjAxSlKgYyxlIdpfZBT3hRF9q0uMmAWssf3Q__', firstName: 'Mary',lastName: "Han" , revenue: 900, major: "International Business" },
        { id: 9, rate: '5/5', numOfClass: 50, imagePath: 'https://s3-alpha-sig.figma.com/img/f1fd/d656/07eef0d4abb2a99c5ad961bcffc81c5f?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DcmWE0ZteAh6chYldsatebsDACUBGOVxHuEJgfizFf4y2dfg5yZZP8bMGSRniIce3yIYjHbjsxfDRd-tIV6SOhST5jK9BTZl0RDimGWp6mE0UhyxVtI7W1o9WulaYK4Ei8xl-OBRgxYFSO-OK8qmj9BQmxOlK-xURrONm19cDfWYxyZ7t36qMmspJltIy1J8vMHptYmrxQfdI7CMoeDaOpBlwhjRjA9pQ8sOnyhGYnwCSa78~absnhWUt71onxabTlIRBV39fT3IBPePLv6EdjY7-U~TNz3~Yb1Da85VutnwJvRxJ9MYO4J9jpFiP32N3UCIBGobfvtsGLDeOPxMdA__', firstName: 'Dino',lastName: "Phi", revenue: 700, major: "Software Engineering" },
    ];
    



    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'imagePath', headerName: 'Image', width: 150, renderCell: (params : {row:Tutor}) => (
                <div>
                    <img
                        src={params.row.imagePath}
                        alt="Tutor_image"
                        style={{ height: "70px", objectFit: "contain" }}
                    />
                </div>

            ),
        },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'revenue', headerName: 'Revenue', width: 200 },
        { field: 'major', headerName: 'Major', width: 300 },
        { field: 'rate', headerName: 'Rating', width: 200 },
        { field: 'numOfClass', headerName: 'Number Of Class', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params : {row: Tutor}) => (
                <div>
                    <Button variant="text" onClick={() => openDataDialog(params.row)}><VisibilityIcon className='text-[#43BF8E]'/></Button>
                    <Button variant="text" ><Link href={`/tutor/${params.row.id}`}><ModeEditIcon className='text-[#43BF8E]'/></Link></Button>
                    <Button variant="text" onClick={() => openDeleteDialog(params.row)}><DeleteIcon className='text-[#43BF8E]'/></Button>
                </div>

            ),
        },

    ];






    return (
        <div style={{ height: "75vh", paddingTop: "50px", paddingBottom: "100px", zIndex: "-1" }}>
            <DataGrid
                rows={tutor}
                columns={columns}
                getRowId={getRowId}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    fontFamily: "Belanosima", fontSize: "17px", color: "#d7d4d4", backgroundColor: "#1C2536"
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                rowHeight={100}
                
            />

            {/* Detail Dialog */}
            <TutorDetail
                open={dataDialogOpen}
                onClose={closeDialogs}
                selectedData={selectedRow}
            />

            {/* Confirm delete dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle><p className='font-[Belanosima]'>Confirm Delete</p></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <p className='font-[Belanosima]'>Are you sure you want to delete this item?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
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
