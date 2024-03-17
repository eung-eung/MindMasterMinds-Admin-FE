import ShowChartIcon from '@mui/icons-material/ShowChart';
import classes from './Card.module.css'

interface CardProps {
    item: {
        title: string;
        total: string;
        label: string;
    }
}


export default function Card({ item }: { item: any }) {

    return (
        <div className={classes.cardItem}>
            <p>{item.title}
                <div className={classes.itemChart}>
                    <ShowChartIcon />
                    10%
                </div>
            </p>
            <p>{item.total}</p>
            <p>{item.label}</p>
        </div>
    );
}

