"use client"
import React, { useState } from 'react'
import { Button } from "@mui/material"
import TableTutor from './TableTutor';
import TutorCreate from './TutorCreate';
import classes from './page.module.css'

export default function TutorManage() {
    const [eventRefresh, setEventRefresh] = useState<boolean>(false);
    const handleEventRefresh = () => {
        setEventRefresh(prev => !prev)
    }
    
    return (
        <div className={`${classes.serviceContainer}`}>
            <div className={classes.serviceTitle}>
                <h2 className="font-semibold text-left text-3xl font-[Belanosima] text-[#bfbaba]">Tutors Management</h2>
            </div>
            <div className={classes.serviceContent}>
                <div className={classes.serviceAction}>
                    <div className={classes.serviceActionBtn }>
                        <TutorCreate handleCallback={handleEventRefresh} />
                        {/* <div className='mt-10'>
                            <Button id={classes.delete} variant="outlined" color="error">
                                Delete
                            </Button>
                        </div> */}
                    </div>
                </div>
                <TableTutor eventRefresh={eventRefresh} />
                <div>
                </div>
            </div>
        </div>
    )
}
