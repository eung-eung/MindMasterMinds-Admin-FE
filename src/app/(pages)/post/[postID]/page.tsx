"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';

interface Post {
    id: string,
    content: string,
    image: string,
}

export default function PostUpdate() {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState<Post>({
        id: '',
        content: '',
        image: '',
    });





    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle htmlForm submission logic here
    };

    const handlePostClick = () => {
        // Handle post click logic here
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-4">
                            <h1 className="sm:text-4xl font-[Belanosima] font-semibold  font-medium title-font mb-4">Update post</h1>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                               
                                <div className="p-2 w-full mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="content" className="block font-[Belanosima] text-xl font-medium leading-6 ">Content</label>
                                        <div className="mt-2">
                                            <textarea 
                                                name="content"
                                                value={post.content}
                                                onChange={handleChange}
                                                required autoComplete="content" className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                        <div className="col-span-full">
                                            <label htmlFor="mainImage" className="block font-[Belanosima] text-xl font-medium leading-6 ">Image</label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-4">
                                                <div className="text-center">
                                                    <div className="mt-1 flex font-[Belanosima] text-xl leading-6 ">
                                                        <label htmlFor="mainImage" className="relative cursor-pointer rounded-md font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-[#43BF8E]">
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
                <DialogTitle id="alert-dialog-title"><p className='font-[Belanosima]'>SUCCESS</p></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="success">
                            <AlertTitle><p className='font-[Belanosima]'>Updated successfully!</p></AlertTitle>
                            <p className='font-[Belanosima]'>The post has been successfully updated.</p>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                    <p className='font-[Belanosima]'>Close</p>
                    </Button>
                    <Button onClick={handlePostClick} color="primary" autoFocus>
                    <p className='font-[Belanosima]'>Post</p>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
