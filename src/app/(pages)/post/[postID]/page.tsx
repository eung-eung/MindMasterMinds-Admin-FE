"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';

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

export default function PostUpdate() {
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState<Post>({
        id: 1,
        title: 'Post 1',
        category: 'News',
        date: '2024-02-07',
        author: 'John Doe',
        major: 'Computer Science',
        view: 3000,
        like: 1500,
        content: 'Become the premier connecting platform, making it easy for everyone to access knowledge and a supportive community, thereby unlocking their own potential and contributing to society'
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
                            <h1 className="sm:text-4xl font-[Belanosima] font-semibold  font-medium title-font mb-4 text-white">Update post</h1>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full">
                                    <div className="col-span-full">
                                        <label htmlFor="title" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Title</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="title"
                                                value={post.title}
                                                onChange={handleChange}
                                                autoComplete="title" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="col-span-full">
                                        <label htmlFor="category" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Category</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="category"
                                                value={post.category}
                                                onChange={handleChange}
                                                autoComplete="category" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2 mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="date" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Date</label>
                                        <div className="mt-2">
                                            <input type="date"
                                                name="date"
                                                value={post.date}
                                                onChange={handleChange}
                                                required autoComplete="date" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2 mt-4">

                                    <div className="sm:col-span-3">
                                        <label htmlFor="author" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Author</label>
                                        <div className="mt-2">
                                            <input type="number"
                                                name="author"
                                                value={post.author}
                                                onChange={handleChange}
                                                required autoComplete="author" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="major" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Major</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="major"
                                                value={post.major}
                                                onChange={handleChange}
                                                required autoComplete="major" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="content" className="block font-[Belanosima] text-xl font-medium leading-6 text-[#d7d4d4]">Content</label>
                                        <div className="mt-2">
                                            <textarea 
                                                name="content"
                                                value={post.content}
                                                onChange={handleChange}
                                                required autoComplete="content" className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m font-[Belanosima] sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button type='submit' className="flex mx-auto my-10 text-white bg-[#43BF8E] border-0 py-2 px-8 focus:outline-none hover:bg-[#358464] rounded text-lg">Update</button>
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
