"use client"

import { axiosAuth } from "@/app/lib/axious";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Subject {
    id: string;
    name: string;
    code: string;
    description: string;
    price: number;
}

export default function UpdateSubject({ subjectID }: { subjectID: string }) {
  
    const { data: session } = useSession()
  const token = session?.user.accessToken;
  const [updatedSubject, setUpdatedSubject] = useState<Subject | null>({
    id: '',
    name: '',
    code: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`/Subject/${subjectID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const subjectData = response.data;
      setUpdatedSubject(subjectData);
      console.log("Update subject"+ updatedSubject);

      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchData();
  }, [subjectID, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setUpdatedSubject((prevState) => ({
        ...prevState!,
        [name]: value !== undefined ? value : '',
      }));
};


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axiosAuth.put(`/Subject/${subjectID}`, updatedSubject, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.status === 200) {
            console.log('Profile updated successfully');
            toast.success('Profile updated successfully', {
                position: 'top-right',
                autoClose: 3000, // Close the toast after 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                window.location.href = '/subject';
            }, 3500);      
        }

    } catch (error) {
        console.error('Error updating profile:', error); 
            toast.error('Failed to update profile', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }
};
return updatedSubject ? (
     <div >
        <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        transition={Bounce}
                    />
            <form onSubmit={handleSubmit}>
                <section className="text-gray-600 body-font relative">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-4xl text-4xl font-semibold font-[Belanosima] mb-2 text-gray-700 ">Update Subject</h1>
                        </div>
                        <div className="lg:w-3/4 md:w-2/3 mx-auto ">
                            <div className="flex flex-wrap -m-8">
                                <div className="p-2 w-full">
                                    <div className="col-span-full">
                                        <label htmlFor="name" className="block font-medium font-[Belanosima] text-xl leading-6 ">Name</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="name" 
                                                value={updatedSubject?.name}
                                                onChange={handleChange}
                                                autoComplete="name" className="block font-[Belanosima] text-xl p-4 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-full mt-4">
                                    <div className="col-span-full">
                                        <label htmlFor="code" className="block font-[Belanosima] text-xl font-medium leading-6 ">Code</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="code" 
                                                value={updatedSubject?.code}
                                                onChange={handleChange}
                                                autoComplete="code" className="block font-[Belanosima] text-xl p-4 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2 mt-4">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="description" className="block font-[Belanosima] text-xl font-medium leading-6 ">Description</label>
                                        <div className="mt-2">
                                            <input type="text"
                                                name="description"
                                                value={updatedSubject?.description}
                                                onChange={handleChange}
                                                required autoComplete="description" className="block font-[Belanosima] text-xl p-4 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2 mt-4">

                                    <div className="sm:col-span-3">
                                        <label htmlFor="price" className="block font-[Belanosima] text-xl font-medium leading-6 ">Price</label>
                                        <div className="mt-2">
                                            <input type="number"
                                                name="price"
                                                value={updatedSubject?.price}
                                                onChange={handleChange}
                                                required autoComplete="price" className="block font-[Belanosima] text-xl p-4 w-full rounded-md border-0 py-1.5 text-grey-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
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
        </div>
  ) : null;
  
}
