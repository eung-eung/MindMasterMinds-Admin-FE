import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PaperClipIcon } from '@heroicons/react/20/solid';

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
    id: string;
    content: string;
    image: string;
    creationDate: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      userRole: {
        roleName: string;
      };
    };
  } | null;
}

export default function PostDetail({ open, onClose, selectedData }: Props) {
  return (
    <React.Fragment>
      <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 3, fontSize: '30px' }} id="customized-dialog-title">
          <p className="font-[Belanosima] font-semibold">Detail Post</p>
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
          <div className="mt-2 px-8">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">ID</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? selectedData.id : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Image</dt>
                <dd className="mt-1 sm:col-span-2 sm:mt-0">
                  {selectedData && selectedData.image && (
                    <img
                      src={selectedData.image}
                      alt="post_image"
                      className="h-40 w-auto object-cover"
                    />
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Creation Date</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? selectedData.creationDate : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Content</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? selectedData.content : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Author</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? `${selectedData.user.firstName} ${selectedData.user.lastName}` : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Author role</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? `${selectedData.user.userRole.roleName} ` : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Author email</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? `${selectedData.user.email}` : ''}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-[Belanosima] text-2xl leading-6">Author phone</dt>
                <dd className="mt-1 font-[Belanosima] text-xl leading-6 text-gray-600 sm:col-span-2 sm:mt-0">
                  {selectedData ? `${selectedData.user.phoneNumber}` : ''}
                </dd>
              </div>
            </dl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            <p className="font-[Belanosima] text-lg text-[#43BF8E]">Close</p>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
