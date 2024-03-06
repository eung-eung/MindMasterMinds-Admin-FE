"use client"
import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';
import { styled } from '@mui/material';


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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props: { row: Major }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { data: session } = useSession();
  const token = session?.user.accessToken;

  const fetchSubjects = async (courseId: string) => {
    try {
      const response = await axiosAuth.get(`/Subject/get-subject-by-courseId/${courseId}?pageNumber=0&pageSize=100`, {
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
      setSubjects(subjectData);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              if (!open) {
                fetchSubjects(row.id);
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
        <p className='font-[Belanosima] text-lg'>{row.name}</p>
        </TableCell>
        <TableCell align="left"><p className='font-[Belanosima] text-lg'>{row.code}</p></TableCell>
        <TableCell align="left"><p className='font-[Belanosima] text-lg'>{row.description}</p></TableCell>
      </TableRow>
      <StyledTableRow>
    <StyledTableCell style={{ paddingBottom: 14, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
                <Typography variant="h5" gutterBottom component="div">
                    <p className='font-[Belanosima]'>List of subject</p>
                </Typography>
                <Table size="medium" aria-label="subjects">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell><p className='font-[Belanosima] text-lg'>Name</p></StyledTableCell>
                            <StyledTableCell><p className='font-[Belanosima] text-lg'>Code</p></StyledTableCell>
                            <StyledTableCell align="left"><p className='font-[Belanosima] text-lg'>Description</p></StyledTableCell>
                            <StyledTableCell align="left"><p className='font-[Belanosima]  text-lg'>Price (VND)</p></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={4}>
                                    <p className='font-[Belanosima] text-lg'>No subject</p>
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            subjects.map((subject) => (
                                <StyledTableRow key={subject.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <p className='font-[Belanosima] text-lg'>{subject.name}</p>
                                    </StyledTableCell>
                                    <StyledTableCell><p className='font-[Belanosima] text-lg'>{subject.code}</p></StyledTableCell>
                                    <StyledTableCell align="left"><p className='font-[Belanosima] text-lg'>{subject.description}</p></StyledTableCell>
                                    <StyledTableCell align="left"><p className='font-[Belanosima] text-lg'>{subject.price}</p></StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Collapse>
    </StyledTableCell>
</StyledTableRow>

    </Fragment>
  );
}




export default function TableMajor() {
  const [majors, setMajors] = useState<Major[]>([]);
  const { data: session } = useSession();
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
        setMajors(majorData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell ><p className='font-[Belanosima] font-semibold text-2xl'>Name</p></TableCell>
            <TableCell align="left" sx={{width:"150px"}}><p className='font-[Belanosima] font-semibold text-2xl'>Code</p></TableCell>
            <TableCell align="left"><p className='font-[Belanosima] font-semibold text-2xl'>Description</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {majors.map((major) => (
            <Row key={major.id} row={major} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
