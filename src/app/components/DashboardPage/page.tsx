"use client"
import Card from './Card/Card';
import Revenue from './Revenue/Revenue';
import StudioStatus from './StudioStatus/StudioStatus';
import PieChart from './PieChart/PieChart';
import classes from './page.module.css'
import { useEffect, useState } from 'react';
import useAxiosAuth from '@/app/lib/hooks/useAxiosAuth';



export default function DashBoardPage() {
    const [revenue, setRevenue] = useState({})
    const [tutor, setTutor] = useState({})
    const [student, setStudent] = useState({})
    const axios = useAxiosAuth()
    useEffect(() => {
        const getRevenue = async () => {
            const revenue = await axios.get('/Dashboard/revenue')
            const formattedRevenue = parseFloat(revenue.data.message).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            setRevenue({
                title: 'Revenue',
                total: formattedRevenue,
                label: 'VND'
            });
        }

        const getTutor = async () => {
            const tutor = await axios.get('/Dashboard/count-user-by-role-name?roleName=Tutor')
            setTutor({
                title: 'Tutors',
                total: tutor.data.message,
                label: 'Tutors'
            })
        }
        const getStudent = async () => {
            const student = await axios.get('/Dashboard/count-user-by-role-name?roleName=Student')
            setStudent({
                title: 'Students',
                total: student.data.message,
                label: 'Students'
            })
        }
        getRevenue()
        getTutor()
        getStudent()
    }, [])
    return (
        <div className={classes.dashboardContainer}>
            <div className={classes.cardContainer}>
                <Card item={revenue} />
                <Card item={tutor} />
                <Card item={student} />
            </div>
            <div className={classes.chartBar}>
                <h3 className='text-left mb-4 font-[Belanosima] text-black text-3xl'>Revenue</h3>
                <Revenue />
            </div>
            {/* <div style={{ marginTop: "80px", display: "flex", justifyContent: "space-between" }}>
                <div className={classes.studioStatus}>
                    <StudioStatus />
                </div>
                <div className={classes.chartPie}>
                    <h3 className='font-[Belanosima] text-2xl'>Top 3 Best Tutor of Year</h3>
                    <h4 className='font-[Belanosima] color-[#0B1354] text-xl'>2800$</h4>
                    <div style={{ height: "250px", marginTop: "30px" }}>
                        <PieChart />
                    </div>
                </div>
            </div> */}
        </div>
    )
}
