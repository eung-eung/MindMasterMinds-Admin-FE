import ShowChartIcon from '@mui/icons-material/ShowChart';
import classes from './Card.module.css'

interface CardProps {
    item: {
        title: string;
        total: string;
        label: string;
    }
}

const Card: React.FC<CardProps> = ({ item }) => {
    console.log(item);
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

export default Card;
