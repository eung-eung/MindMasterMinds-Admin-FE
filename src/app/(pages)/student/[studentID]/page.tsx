"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    yob: number;
    totalCourse: number;
    totalFee: number;
    email: string;
    phoneNum: string;
}


export default function StudentUpdate ()  {
    const [open, setOpen] = useState<boolean>(false);
    const [student, setStudent] = useState<Student>({
        id: 1,
        firstName: 'Jon',
        lastName: 'Snow',
        yob: 2000,
        totalCourse: 25,
        totalFee: 450,
        email: 'abc123@Gmail.com',
        phoneNum: '0987654321',
    });

    const [isYOBValid, setIsYOBValid] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'yob') {
            const isValid = parseInt(value, 10) >= 1000 && parseInt(value, 10) <= 2024;
            setIsYOBValid(isValid);
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(value);
            setIsEmailValid(isValid);
        } else if (name === 'phoneNum') {
            const phoneRegex = /^0\d{9}$/;
            const isValid = phoneRegex.test(value);
            setIsPhoneNumValid(isValid);
        }
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        setOpen(true); // For demonstration purpose
    };

    const handleStudentClick = () => {

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-4xl text-4xl font-semibold font-[Belanosima] mb-2 text-white ">Update student</h1>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 mx-auto ">
                            <div className="flex flex-wrap -m-8">
                                <div className="p-2 w-full">
                                    <div className="col-span-full">
                                        <label htmlFor="firstName" className="block font-medium font-[Belanosima] text-xl leading-6 text-[#d7d4d4]">First name</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="firstName" 
                                                value={student.firstName}
                                                onChange={handleChange}
                                                autoComplete="firstName" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="col-span-full">
                                        <label htmlFor="lastName" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Last name</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="lastName" 
                                                value={student.lastName}
                                                onChange={handleChange}
                                                autoComplete="lastName" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2 mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="yob" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Year of birth</label>
                                        <div className="mt-2">
                                            <input type="number"
                                                name="yob"
                                                value={student.yob}
                                                onChange={handleChange}
                                                required autoComplete="yob" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            {!isYOBValid && <div style={{ color: 'red', fontFamily:"Belanosima" }}>Year of Birth must be between 1000 and 2024</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2 mt-4">

                                    <div className="sm:col-span-3">
                                        <label htmlFor="totalCourse" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Total Course</label>
                                        <div className="mt-2">
                                            <input type="number"
                                                name="totalCourse"
                                                value={student.totalCourse}
                                                onChange={handleChange}
                                                required autoComplete="totalCourse" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Email</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="email"
                                                value={student.email}
                                                onChange={handleChange}
                                                required autoComplete="email" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            {!isEmailValid && <div style={{ color: 'red', fontFamily:"Belanosima" }}>Email is invalid!</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="phoneNum" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Number</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="phoneNum"
                                                value={student.phoneNum}
                                                onChange={handleChange}
                                                required autoComplete="phoneNum" className="block font-[Belanosima] text-xl p-2 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            {!isPhoneNumValid && <div style={{ color: 'red', fontFamily:"Belanosima" }}>Phone number is invalid!</div>}
                                        </div>
                                    </div>
                                </div>
                        
                                <div className="p-2 w-full">
                                    <button type='submit' className="flex font-[Belanosima] text-xl mx-auto my-10 text-white bg-[#43BF8E] border-0 py-2 px-8 focus:outline-none hover:bg-[#358464] rounded text-lg">Update</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </form>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">SUCCESS</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="success">
                            <AlertTitle>Updated successfully!</AlertTitle>
                            The student has been successfully updated.
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    <Button onClick={handleStudentClick} color="primary" autoFocus>
                        student
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

