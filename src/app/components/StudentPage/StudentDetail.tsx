"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paperWidthSm': {
    maxWidth: '60%', 
  },
}));

interface Props {
    open: boolean;
    onClose: () => void;
    selectedData: {
        id: string;
        avatar: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        userRole : {
          roleName: string
      }
    } | null | undefined;
  }

export default function StudentDetail({ open, onClose, selectedData }: Props) {

console.log(selectedData)
  return (
    <React.Fragment>
     
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <DialogTitle sx={{ m: 0, p: 2, fontFamily: "Belanosima"}} id="customized-dialog-title">
          Detail Dialog
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
        <div className="bg-white px-1 pb-1 pt-1 sm:p-1 sm:pb-1">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {/* Detai Student */}
                      <div>
                        <section className="text-gray-600 body-font">
                          <div className="container px-2 py-4 mx-auto">
                          <div className="text-center">
                            {/* <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">{selectedData && selectedData.name}</h1> */}
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
                                <div className="mx-auto max-w-2xl py-0 mb-3 pb-0 sm:py-0 lg:max-w-none lg:py-0">
                                    <div>
                                        <div className="relative h-full w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                            {selectedData && selectedData.avatar && (
                                                <img
                                                    src={selectedData.avatar}
                                                    alt='Main image'
                                                    className="h-full w-full object-contain object-center"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="text-center mb-6">
                              <h1 className="sm:text-3xl text-2xl font-semibold text-center title-font mb-2 font-[Belanosima] ">Detail User</h1>
                            </div>
                            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                              <div className="p-2 sm:w-1/2 w-full">
                                <div className="bg-white border border-gray-400 rounded flex p-4 h-full items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                  </svg>

                                  <span className=" mr-2 ml-2 font-semibold font-[Belanosima] text-xl ">First name:</span>
                                  <span className="title-font font-medium font-[Belanosima] text-xl">{selectedData ? selectedData.firstName : ''}</span>
                                </div>
                              </div>
                              <div className="p-2 sm:w-1/2 w-full">
                                <div className="bg-white border border-gray-400 rounded flex p-4 h-full items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                  </svg>

                                  <span className=" mr-2 ml-2 font-semibold font-[Belanosima] text-xl">Last name:</span>
                                  <span className="title-font font-medium font-[Belanosima] text-xl">{selectedData ? selectedData.lastName : ''}</span>
                                </div>
                              </div>
                              <div className="p-2 sm:w-full w-full">
                                <div className="bg-white border border-gray-400 rounded flex p-4 h-full items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                  <span className=" mr-2 ml-2 font-semibold font-[Belanosima] text-xl">Email:</span>
                                  <span className="title-font font-medium font-[Belanosima] text-xl">{selectedData ? selectedData.email : ''}</span>
                                </div>
                              </div>
                              <div className="p-2 sm:w-full w-full">
                                <div className="bg-white border border-gray-400 rounded flex p-4 h-full items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                  </svg>

                                  <span className="mr-2 ml-2 font-semibold font-[Belanosima] text-xl">PhoneNumber:</span>
                                  <span className="title-font font-medium font-[Belanosima] text-xl">{selectedData ? selectedData.phoneNumber : ''}</span>
                                </div>
                              </div>
                              {/* <div className="p-2 sm:w-full w-full">
                                <div className="bg-white border border-gray-400 rounded flex p-4 h-full items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                  </svg>

                                  <span className=" mr-2 ml-2 font-semibold font-[Belanosima] text-xl">Role:</span>
                                  <span className="title-font font-medium font-[Belanosima] text-xl">{selectedData  ? selectedData.roleName : ''} </span>                              </div>
                              </div> */}
         
                            </div>
                          </div>
                        </section>
                      </div>

                    </div>
                  </div>
                </div>
                
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} sx={{backgroundColor:"#43BF8E"}}>
          <p className='font-[Belanosima] text-black'>Close</p>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
