import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PaperClipIcon } from '@heroicons/react/20/solid'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialog-paperWidthSm': {
    maxWidth: '65%', 
  },
}));

interface Props {
    open: boolean;
    onClose: () => void;
    selectedData: {
        id: number,
        title: string,
        category: string,
        date: string,
        author: string,
        major: string,
        view: number,
        like: number, 
        content: string,
    } | null;
  }

export default function PostDetail({open, onClose, selectedData} :Props) {
  return (
    
    <React.Fragment>
     
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 3,  fontSize: "30px"}} id="customized-dialog-title">
        <p className='font-[Belanosima] font-semibold'>Detail Post</p>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div>
      
      <div className="mt-2 px-8">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl leading-6 ">Title</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData? selectedData.title : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl  leading-6 ">Category</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.category : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl leading-6 ">Date</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.date : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl  leading-6 ">Author</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.author : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl leading-6 ">Major</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.major : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl leading-6 ">View</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.view : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl  leading-6 ">Like</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.like : ""}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-[Belanosima] text-2xl leading-6 ">Content</dt>
            <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">{selectedData ? selectedData.content : ""}</dd>
          </div>
        </dl>
      </div>
    </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
          <p className='font-[Belanosima] text-lg text-[#43BF8E]'>Close</p>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    
  );
}
