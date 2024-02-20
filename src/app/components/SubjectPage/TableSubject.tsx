"use client"
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';
import Link from 'next/link';



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



  const { data: session, status } = useSession()
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

  const columns = [
    { field: 'name', headerName: 'Name', width: 250, renderCell: customCellRenderer },
    { field: 'code', headerName: 'Code', width: 150, renderCell: customCellRenderer },
    { field: 'description', headerName: 'Description', width: 750, renderCell: customCellRenderer },
    { field: 'price', headerName: 'Price', width: 150, renderCell: customCellRenderer },
    {
      field: 'actions',
      headerName: 'Edit',
      width: 100,
      renderCell: (params: { row: Subject }) => (
        <div>
          {/* <Button variant="text" onClick={() => openDataDialog(params.row as User)}>
                  <GridVisibilityOffIcon className='text-[#43BF8E]' />
              </Button> */}
          <Button variant="text">
            <Link href={`/subject/${params.row.id}`}>
              <ModeEditIcon className='text-[#43BF8E]' />
            </Link>
          </Button>
          {/* <Button variant="text" onClick={() => openDeleteDialog(params.row as Subject)}>
                  <DeleteIcon className='text-[#43BF8E]' />
              </Button> */}
        </div>
      ),
    },
  ];




  return (
    <div>

      <div className='mb-10'>
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

      {subjectFiltered ?
        <DataGrid
          rows={subjectFiltered}
          columns={columns}
          getRowId={getRowId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ fontFamily: "Belanosima", fontSize: "17px", backgroundColor: "white" }}
        />
        :
        <div className='block pb-60'>
          <h1>Not subject yet</h1>
        </div>
      }
    </div>
  );
}

export default TableSubject;
