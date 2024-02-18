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

interface Props {
    handleCallback: () => void;
}

export default function TutorCreate({ handleCallback }: Props) {
    const initialTutor: Tutor = {
        id: 0,
        imagePath: '',
        firstName: '',
        lastName: '',
        revenue: 0,
        major: '',
        rate: '',
        numOfClass: 0, 
    };

    const [newTutor, setNewTutor] = useState<Tutor>(initialTutor);
    const [open, setOpen] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isRevenueValid, setIsRevenueValid] = useState(true);
    const [isRateValid, setIsRateValid] = useState(true);
    const [isNumOfclassNameValid, setIsNumOfclassNameValid] = useState(true);

    const handleClose = () => {
        setOpen(false);
        setSuccessDialogOpen(false);
        setNewTutor(initialTutor);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'revenue') {
            const isValid = parseFloat(value) >= 0;
            setIsRevenueValid(isValid);
        }

        if (name === 'rate') {
            const isValid = parseFloat(value) >= 1 && parseFloat(value) <= 5;
            setIsRateValid(isValid);
        }

        if (name === 'numOfclassName') {
            const isValid = parseFloat(value) >= 0;
            setIsNumOfclassNameValid(isValid);
        }

        setNewTutor({ ...newTutor, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // handle htmlForm submission
    };

    return (
        <>
            <Button
                id='create'
                onClick={handleClickOpen}
                variant="contained"
                style={{ backgroundColor: '#79fcc8', color:"black" }} 
            >
                <ControlPoint />
                <p className='font-[Belanosima] font-semibold ml-2'>New Tutor</p>
            </Button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{ style: { backgroundColor: '#1C2536' } }}
            >
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <section className="text-white body-font relative">
                        <div >
                            <div className="flex flex-col text-center w-full mt-10 mb-10">
                                <h1 className="sm:text-3xl text-2xl font-semibold font-[Belanosima] title-font mb-4 text-white">Add New Tutor</h1>
                            </div>
                            <div className="lg:w-2/3 md:w-2/3 mx-auto">
                                <div className="flex flex-wrap -m-12">
                                    <div className="p-2 w-full">

                                        <div className="col-span-full">
                                            <label htmlFor="firstName" className="block font-medium font-[Belanosima] text-xl leading-6 text-[#bfbaba]">Name</label>
                                            <div className="mt-2">
                                                <input value={newTutor.firstName}
                                                    onChange={handleChange}
                                                    id="firstName"
                                                    type='text'
                                                    name="firstName" autoComplete="firstName" className="block font-[Belanosima] text-m p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-full">

                                        <div className="col-span-full">
                                            <label htmlFor="lastName" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#bfbaba]">Description</label>
                                            <div className="mt-2">
                                                <textarea value={newTutor.lastName}
                                                    onChange={handleChange}
                                                    id="lastName"
                                                    name="lastName"  className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    {/* <div className="p-2 w-full">

                                        <div className="col-span-full">
                                            <label htmlFor="revenue" className="block text-sm font-medium leading-6 text-[#bfbaba]">Revenue</label>
                                            <div className="mt-2">
                                                <input value={newTutor.revenue}
                                                    onChange={handleChange}
                                                    type='number'
                                                    id="revenue"
                                                    name="revenue" autoComplete="revenue" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                {!isRevenueValid && <div style={{ color: 'red' }}>Revenue must be larger than 0</div>}
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="p-2 w-full">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="major" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#bfbaba]">Major</label>
                                            <div className="mt-2">
                                                <select onChange={handleChange}
                                                    value={newTutor.major}
                                                    id="major"
                                                    name="major"
                                                    required
                                                    autoComplete="major"
                                                    className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6">
                                                    <option value="">Select Major</option>
                                                    <option value="Digital Marketing">Digital Marketing</option>
                                                    <option value="International Business">International Business</option>
                                                    <option value="Multimedia Communications">Multimedia Communications</option>
                                                    <option  value="Software Engineering">Software Engineering</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 w-1/2">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="rate" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#bfbaba]">Rate</label>
                                            <div className="mt-2">
                                                <input onChange={handleChange}
                                                    value={newTutor.rate}
                                                    id="rate"
                                                    name="rate"
                                                    type='number'
                                                    required autoComplete="rate" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                                {!isRateValid && <div style={{ color: 'red', fontFamily: "Belanosima" }}>Rate must be between 1 and 5</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 w-1/2">

                                        <div className="sm:col-span-3">
                                            <label htmlFor="numOfClass" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#bfbaba]">Number Of Class</label>
                                            <div className="mt-2">
                                                <input onChange={handleChange}
                                                    value={newTutor.numOfClass}
                                                    id="numOfClass"
                                                    name="numOfClass"
                                                    type='number'
                                                    required autoComplete="numOfClass" className="block font-[Belanosima]  p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                                {!isNumOfclassNameValid && <div style={{ color: 'red', fontFamily: "Belanosima" }}>Number of className must be larger 0</div>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-2 w-full">
                                        <div className="col-span-full">
                                            <label htmlFor="mainImage" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#bfbaba]">Main image</label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-[#bfbaba] px-2 py-4">
                                                <div className="text-center">
                                                    <div className="mt-1 flex text-sm leading-6 text-gray-600">
                                                        <label htmlFor="mainImage" className="relative cursor-pointer rounded-md bg-white font-semibold text-[#bfbaba] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span className='font-[Belanosima] text-xl'>Upload a file</span>
                                                            <input accept=".jpg, .jpeg, .png" id="mainImage" type="file" name="mainImage" onChange={handleChange} className="sr-only" />
                                                        </label>
                                                        <p className="pl-1 font-[Belanosima] text-xl">or drag and drop</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="p-2 mb-10 mt-8 w-full">
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
                    {"You have created a new cage"}
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
                    <Button onClick={() => {
                        handleClose()
                        handleCallback()
                    }} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
