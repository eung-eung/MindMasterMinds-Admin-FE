"use client"
import Card from './Card/Card';
import Revenue from './Revenue/Revenue';
import StudioStatus from './StudioStatus/StudioStatus';
import PieChart from './PieChart/PieChart';
import classes from './page.module.css'

interface CardItem {
    title: string;
    total: string;
    label: string;
}

const array: CardItem[] = [
    {
        title: "Total student",
        total: '1440',
        label: 'Students'
    },
    {
        title: "Total Tutor",
        total: '20',
        label: 'Tutors'
    },
    {
        title: "Total Post",
        total: '77',
        label: 'Posts'
    },
    {
        title: "Revenue",
        total: '7789',
        label: '$'
    }
];

export default function DashBoardPage() {
    return (
        <div className={classes.dashboardContainer}>
            <div className={classes.cardContainer}>
                {array.map(item => <Card item={item} key={item.title} />)}
            </div>
            <div className={classes.chartBar}>
                <h3 className='text-left mb-4 font-[Belanosima] text-black text-3xl'>Revenue</h3>
                <Revenue />
            </div>
            <div style={{ marginTop: "80px", display: "flex", justifyContent: "space-between" }}>
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
            </div>
        </div>
    )
}
