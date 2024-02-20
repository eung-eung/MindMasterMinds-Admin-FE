"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ControlPoint from '@mui/icons-material/ControlPoint';

import { Alert, AlertTitle, DialogContentText } from '@mui/material';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

interface Major {
    id: string,
    name: string,
    code: string,
    description: string
}


export default function MajorCreate() {
    const { data: session } = useSession()
    const token = session?.user.accessToken;

    const [newMajor, setNewMajor] = useState<Major>({
        id: '',
        name: '',
        code: '',
        description: ''
    });

    const [open, setOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isNameValid, setIsNameValid] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setSuccessDialogOpen(false);
        
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(name === "name") {
            const isValid = value.length > 0 && value.length <=50;
            setIsNameValid(isValid);
        }
        setNewMajor({
            ...newMajor,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosAuth.post('/Course',
                newMajor,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
            console.log('Major created:', response.data);
            setSuccessDialogOpen(true);

        } catch (error) {
            console.error('Error creating major:', error);
        }
    };

    return (
        <>
            <Button
                id='create'
                onClick={handleClickOpen}
                variant="contained"
                style={{ backgroundColor: '#79fcc8', color: "black" }}
            >
                <ControlPoint />
                <p className='font-[Belanosima] font-semibold ml-2'>New Major</p>
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form style={{ width: "100%", height: "500px" }} onSubmit={handleSubmit}>
                    <section className="text-white body-font relative">
                        <div >
                            <div className="flex flex-col text-center w-full mt-10 mb-10">
                                <h1 className="sm:text-3xl text-2xl font-semibold font-[Belanosima] title-font mb-4 text-gray-700">Add New Major</h1>
                            </div>
                            <div className="lg:w-2/3 md:w-2/3 mx-auto">
                                <div className="flex flex-wrap -m-12">
                                    <div className="p-2 w-full">

                                        <div className="col-span-full">
                                            <label htmlFor="name" className="block font-medium font-[Belanosima] text-xl leading-6 text-gray-700">Name</label>
                                            <div className="mt-2">
                                                <input value={newMajor.name}
                                                    onChange={handleChange}
                                                    id="name"
                                                    type='text'
                                                    name="name"
                                                    required autoComplete="name" className="block font-[Belanosima] text-m p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                                {!isNameValid && <div style={{ color: 'red', fontFamily: "Belanosima" }}>Name must be less than 50 characters</div>}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full mt-2">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="code" className="block font-[Belanosima] text-xl font-medium leading-6 text-gray-700">Code</label>
                                            <div className="mt-2">
                                                <input onChange={handleChange}
                                                    value={newMajor.code}
                                                    id="code"
                                                    name="code"
                                                    type='text'
                                                    required autoComplete="code" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full mt-2">
                                        <div className="col-span-full">
                                            <label htmlFor="description" className="block font-[Belanosima] text-xl font-medium leading-6 text-gray-700">Description</label>
                                            <div className="mt-2">
                                                <textarea value={newMajor.description}
                                                    onChange={handleChange}
                                                    id="description"
                                                    name="description" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="p-2 mb-10 mt-6 w-full">
                                        <button type='submit' className="flex mx-auto text-white bg-[#43BF8E] border-0 py-2 px-8 focus:outline-none hover:bg-[#358464] rounded font-[Belanosima] text-lg">Create</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>
                </form>

            </BootstrapDialog >
            <Dialog
                open={successDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"You have created a new major!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <strong>Create successfully!</strong>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleClose(), window.location.reload();}} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
