"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


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
export default function TutorUpdate() {
    const [open, setOpen] = useState(false);
    const [tutor, setTutor] = useState<Tutor>({
        id: 1,
        firstName: 'Adrian',
        lastName: 'Bui',
        revenue: 1200,
        major: 'Digital Marketing',
        rate: '5/5',
        numOfClass: 50,
        imagePath: 'https://s3-alpha-sig.figma.com/img/6181/1ae8/89b0660d6dd91bdedba586139a98a0fe?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dcar9Uyk96l2jpeTh2G6LaJt7V5gXJFk7gwxFXMec4JELFGSF8WvJm7gj~KmJh0u24qRFGSeo9qzVKVjNjfGK9V1R~6X8MclhaxavpFdUrxZUx7EAcibCZyMarwVSpLE5NtAOTFoFNsoHNUT~rm15LQuIQ2IDkHX9CQMCmmc~JltROwYdkvxWuffL6-I3TRyMVMZvq92cxBOlaVaMJorSIlqcSSnZOmk6L6PT3FfjrP19PRTh9S38DxgXq641FaK-gJSw-hFc2-min3OEZS9kYtIivRU1QH6rnGcZ~3M8AAyhoBXrtVQIgXBu0-k1OGeOIk4LgNqEP1PGp9ZPPc8rw__'
    });

    const [isRevenueValid, setIsRevenueValid] = useState(true);
    const [isRateValid, setIsRateValid] = useState(true);
    const [isNumOfClassValid, setIsNumOfClassValid] = useState(true);
    const [error, setError] = useState(null);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'firstName') {
            setTutor({ ...tutor, firstName: value });
        } else if (name === 'lastName') {
            setTutor({ ...tutor, lastName: value });
        } else if (name === 'revenue') {
            const isValid = parseFloat(value) >= 0;
            setIsRevenueValid(isValid);
            setTutor({ ...tutor, revenue: parseFloat(value) });
        } else if (name === 'major') {
            setTutor({ ...tutor, major: value });
        } else if (name === 'rate') {
            const isValid = parseFloat(value) >= 1 && parseFloat(value) <= 5;
            setIsRateValid(isValid);
            setTutor({ ...tutor, rate: value });
        } else if (name === 'numOfClass') {
            const isValid = parseInt(value) >= 0;
            setIsNumOfClassValid(isValid);
            setTutor({ ...tutor, numOfClass: parseInt(value) });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle htmlForm submission logic here
    };

    const handletutorClick = () => {
        // Handle tutor click logic here
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <section className="text-white body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-4">
                            <h1 className="sm:text-4xl font-[Belanosima] font-semibold title-font mb-4 text-white">Update tutor</h1>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full">
                                    <div className="col-span-full">
                                        <label htmlFor="firstName" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">First name</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="firstName" // Change 'name' attribute to 'firstName'
                                                value={tutor.firstName}
                                                onChange={handleChange}
                                                autoComplete="firstName" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="col-span-full">
                                        <label htmlFor="lastName" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Last name</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="lastName" // Change 'name' attribute to 'lastName'
                                                value={tutor.lastName}
                                                onChange={handleChange}
                                                autoComplete="lastName" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="revenue" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Year of birth</label>
                                        <div className="mt-2">
                                            <input type="number"
                                                name="revenue"
                                                value={tutor.revenue}
                                                onChange={handleChange}
                                                required autoComplete="revenue" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6" />
                                            {!isRevenueValid && <div style={{ color: 'red' }}>Revenue must be larger than 0</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">

                                    <div className="sm:col-span-3">
                                    <label htmlFor="major" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Major</label>
                                            <div className="mt-2">
                                                <select onChange={handleChange}
                                                    value={tutor.major}
                                                    id="major"
                                                    name="major"
                                                    required
                                                    autoComplete="major"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6">
                                                    <option value="">Select Major</option>
                                                    <option value="Digital Marketing">Digital Marketing</option>
                                                    <option value="International Business">International Business</option>
                                                    <option value="Multimedia Communications">Multimedia Communications</option>
                                                    <option value="Software Engineering">Software Engineering</option>
                                                </select>
                                            </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="rate" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Rating</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="rate"
                                                value={tutor.rate}
                                                onChange={handleChange}
                                                required autoComplete="rate" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6" />
                                            {!isRateValid && <div style={{ color: 'red' }}>Rate is between 1 and 5!</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="numOfClass" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Number of className</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="numOfClass"
                                                value={tutor.numOfClass}
                                                onChange={handleChange}
                                                required autoComplete="numOfClass" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                            {!isNumOfClassValid && <div style={{ color: 'red' }}>Number Of className must be larger or equal 0!</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                        <div className="col-span-full">
                                            <label htmlFor="mainImage" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Image</label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-2 py-4">
                                                <div className="text-center">
                                                    <div className="mt-1 flex font-[Belanosima] text-xl leading-6 text-[#d7d4d4]">
                                                        <label htmlFor="mainImage" className="relative cursor-pointer rounded-md bg-black font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                            <span>Upload a file</span>
                                                            <input accept=".jpg, .jpeg, .png" id="mainImage" type="file" name="mainImage" onChange={handleChange} className="sr-only" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                               
                                <div className="p-2 w-full">
                                    <button type='submit' className="flex font-[Belanosima] mx-auto my-10 text-white bg-[#43BF8E] border-0 py-2 px-8 focus:outline-none hover:bg-[#358464] rounded text-lg">Update</button>
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
                            The tutor has been successfully updated.
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    <Button onClick={handletutorClick} color="primary" autoFocus>
                        tutor
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
