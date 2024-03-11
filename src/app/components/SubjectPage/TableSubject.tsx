"use client"
import React, { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Alert, AlertTitle, DialogActions } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';
import Link from 'next/link';
import { ControlPoint } from '@mui/icons-material';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Major {
  id: string,
  name: string,
  code: string,
  description: string
}

interface Subject {
  id: string,
  name: string,
  code: string,
  description: string,
  price: number
}



const TableSubject: React.FC = () => {
  const getRowId = (row: Subject) => row.id;
  const [major, setMajor] = useState<Major[]>([]);
  const [subject, setSubject] = useState<Subject[]>([]);
  const [subjectFiltered, setSubjectFiltered] = useState<Subject[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openCourseSubject, setOpenCourseSubject] = useState(false);
  const [selectedSubjectID, setSelectedSubjectID] = useState<string>("");
  const [selectedMajorID, setSelectedMajorID] = useState<string>("");
  // const [dialogAddSuccess, setDialogAddSuccess] = useState(false);
  const [newSubject, setNewSubject] = useState<Subject>({
    id: '',
    name: '',
    code: '',
    description: '',
    price: 0,
  });

  const [errors, setErrors] = useState({
    price: '',
    name: '',
    code: '',
  });

  const { data: session } = useSession()
  const token = session?.user.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`/Course`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const majorData: Major[] = response.data.data.map((item: Major) => ({
          id: item.id,
          name: item.name,
          code: item.code,
          description: item.description,
        }));
        setMajor(majorData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`/Subject`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const subjectData: Subject[] = response.data.data.map((item: Subject) => ({
          id: item.id,
          name: item.name,
          code: item.code,
          description: item.description,
          price: item.price,
        }));
        setSubject(subjectData);
        setSubjectFiltered(subjectData); // Initialize subjectFiltered with all subjects
      } catch (error) {
        console.error('Error fetching subject data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleChangefilterByFilter = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedMajorName = event.target.value;
    setSelectedMajor(selectedMajorName);
    try {
      if (selectedMajorName === 'All') {
        setSubjectFiltered(subject);
      } else {
        const majorData = major.find((majorItem) => majorItem.name === selectedMajorName);
        if (majorData) {
          const response = await axiosAuth.get(`/Subject/get-subject-by-courseId/${majorData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const subjectData: Subject[] = response.data.data;
          setSubjectFiltered(subjectData);
        }
      }
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  const customCellRenderer = (params: GridRenderCellParams<Subject>) => {
    const cellValue = params.value ? params.value : '';

    return (
      <div style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
        {cellValue}
      </div>
    );
  };

  const handleClose = () => {
    setOpen(false);
    // setDialogAddSuccess(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSubject(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '' // Clear any previous error for this field
    }));

    if (name === 'price' && Number(value) <= 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        price: 'Price must be larger than 0'
      }));
    } else if (name === 'name' && subject.some(subj => subj.name === value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        name: 'Name must be unique'
      }));
    } else if (name === 'code') {
      if (value.length !== 6 || subject.some(subj => subj.code === value)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          code: 'Code must be 6 characters and unique'
        }));
      }
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosAuth.post('/Subject?pageNumber=0&pageSize=100',
        newSubject,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
      if (response.status === 200) {
        console.log('Subject created:', response.data);
        toast.success('Added successfully', {
          position: 'top-right',
          autoClose: 3000,
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
      console.error('Error creating subject:', error);
      toast.error('Failed to update Subject', {
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


  const handleChangeAdd = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMajorName = event.target.value;
    console.log("selectedMajorID: " + selectedMajorID);
    if (selectedMajorName) {
      setSelectedMajor(selectedMajorName);
    }
    const selectedMajorObject = major.find((majorItem) => majorItem.name === selectedMajorName);

    if (selectedMajorObject) {
      setSelectedMajorID(selectedMajorObject.id);
    }

  };



  const handleSubmitCourseSubject = async (subjectID: string) => {
    try {
      const response = await axiosAuth.post('/CourseSubject/add-subject-to-course', {
        courseId: selectedMajorID,
        subjectId: subjectID
      });

      console.log('Subject added:', response.data);
      // setDialogAddSuccess(true);


    } catch (error) {
      console.error('Error adding for major:', error);
      toast.error('Failed to added', {
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


  const columns = [
    { field: 'name', headerName: 'Name', width: 250, renderCell: customCellRenderer },
    { field: 'code', headerName: 'Code', width: 150, renderCell: customCellRenderer },
    { field: 'description', headerName: 'Description', width: 750, renderCell: customCellRenderer },
    { field: 'price', headerName: 'Price', width: 150, renderCell: customCellRenderer },
    {
      field: 'actions',
      headerName: 'Action',
      width: 180,
      renderCell: (params: { row: Subject }) => (
        <div>
          <Button variant="text">
            <Link href={`/subject/${params.row.id}`}>
              <ModeEditIcon className='text-[#43BF8E]' />
            </Link>
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setSelectedSubjectID(params.row.id);
              setOpenCourseSubject(true);
            }}
          >
            <AddCircleIcon className='text-[#43BF8E]' />
          </Button>
        </div>
      ),
    },
  ];




  return (
    <div>
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
      <div className='mb-10 flex justify-between'>
        <div className='flex justify-start'>
          <label htmlFor="majorFilter" className='font-[Belanosima] mr-4'>Filter by Major:</label>
          <select
            id="majorFilter"
            name="majorFilter"
            value={selectedMajor}
            onChange={handleChangefilterByFilter}
            className='font-[Belanosima] p-2'
          >
            <option value="All">All Subject</option>
            {Array.from(new Set(major.map((item) => item.name))).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className='flex justify-end'> {/* Ensure justify-end is applied */}
          <Button
            id='create'
            onClick={handleClickOpen}
            variant="contained"
            style={{ backgroundColor: '#79fcc8', color: "black" }}
          >
            <ControlPoint />
            <p className='font-[Belanosima] font-semibold ml-2'>New Subject</p>
          </Button>
        </div>
      </div>

      {subjectFiltered ?
        <DataGrid
          rows={subjectFiltered}
          columns={columns}
          getRowId={getRowId}
          rowHeight={50}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          disableRowSelectionOnClick
          sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white", paddingLeft: "30px" }}
        />
        :
        <div className='block pb-60'>
          <h1 className='font-[Belanosima] text-xl' >Not subject yet</h1>
        </div>
      }

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form style={{ width: "100%", height: "500px" }} onSubmit={handleSubmit}>
          <section className="text-white body-font relative">
            <div >
              <div className="flex flex-col text-center w-full mt-10 mb-10">
                <h1 className="sm:text-3xl text-2xl font-semibold font-[Belanosima] title-font mb-4 text-gray-700">Create New Subject</h1>
              </div>
              <div className="lg:w-2/3 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-12">
                  <div className="p-2 w-full">

                    <div className="col-span-full">
                      <label htmlFor="name" className="block font-medium font-[Belanosima] text-xl leading-6 text-gray-700">Name</label>
                      <div className="mt-2">
                        <input value={newSubject.name}
                          onChange={handleChange}
                          id="name"
                          type='text'
                          name="name"
                          required autoComplete="name" className="block font-[Belanosima] text-m p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                        {errors.name && (
                          <p className="font-[Belanosima] text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 w-full mt-2">

                    <div className="sm:col-span-3">
                      <label htmlFor="code" className="block font-[Belanosima] text-xl font-medium leading-6 text-gray-700">Code</label>
                      <div className="mt-2">
                        <input onChange={handleChange}
                          value={newSubject.code}
                          id="code"
                          name="code"
                          type='text'
                          required autoComplete="code" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                        {errors.code && (
                          <p className="font-[Belanosima] text-red-500 mt-1">{errors.code}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 w-full mt-2">
                    <div className="col-span-full">
                      <label htmlFor="description" className="block font-[Belanosima] text-xl font-medium leading-6 text-gray-700">Description</label>
                      <div className="mt-2">
                        <textarea value={newSubject.description}
                          onChange={handleChange}
                          id="description"
                          name="description" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"></textarea>
                      </div>

                    </div>
                  </div>
                  <div className="p-2 w-full mt-2">
                    <div className="col-span-full">
                      <label htmlFor="price" className="block font-[Belanosima] text-xl font-medium leading-6 text-gray-700">Price</label>
                      <div className="mt-2">
                        <input
                          type='number'
                          value={newSubject.price}
                          onChange={handleChange}
                          id="price"
                          min='0'
                          name="price" className="block font-[Belanosima] p-2 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6" />
                        {errors.price && (
                          <p className="font-[Belanosima] text-red-500 mt-1">{errors.price}</p>
                        )}
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

      </Dialog >
      <Dialog
        onClose={() => setOpenCourseSubject(false)}
        aria-labelledby="customized-dialog-title"
        open={openCourseSubject}
      >
        <form style={{ width: "400px", height: "100%" }} onSubmit={() => handleSubmitCourseSubject(selectedSubjectID)}>
          <section className="text-white body-font relative">
            <div >
              <div className="flex flex-col text-center w-full mt-10 mb-10">
                <h1 className="sm:text-3xl text-2xl font-semibold font-[Belanosima] title-font mb-4 text-gray-700">Add Subject for Major:</h1>
              </div>
              <div className="lg:w-2/3 md:w-2/3 mx-auto">
                <div className="p-2 w-full mt-2">
                  <div className="flex justify-center">
                    <select
                      id="addMajor"
                      name="addMajor"
                      value={selectedMajor}
                      onChange={handleChangeAdd}
                      className='font-[Belanosima] p-2 text-black border rounded-lg '
                    >
                      <option value=""></option>
                      {Array.from(new Set(major.map((item) => item.name))).map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="p-2 mb-10 mt-6 w-full">
                  <button type='submit' className="flex mx-auto text-white bg-[#43BF8E] border-0 py-2 px-8 focus:outline-none hover:bg-[#358464] rounded font-[Belanosima] text-lg">Add</button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </Dialog>

      {/* Dialog Add Success */}
      {/* <Dialog
        open={dialogAddSuccess}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You have added subject successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle><p className='font-[Belanosima]'>Success</p></AlertTitle>
              <strong className='font-[Belanosima]'>Create successfully!</strong>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(), window.location.reload(); }} color="primary">
            <p className='font-[Belanosima]'>Close</p>
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}

export default TableSubject;
