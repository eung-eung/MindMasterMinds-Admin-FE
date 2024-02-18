import { BarElement, Tooltip, Legend, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { options, data } from './ConfigOption';

const Revenue: React.FC = () => {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        Tooltip,
        Legend,
    );
    return (
        <>
            <Bar
                data={data as ChartData<'bar', (number | null)[], unknown>}
                options={options as ChartOptions<'bar'>}
                style={{ padding: "20px"}}
            />
        </>
    );
};

export default Revenue;
