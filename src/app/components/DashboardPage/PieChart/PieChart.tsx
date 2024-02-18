import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Point, BubbleDataPoint } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

import { data, options } from './ConfigOption';



export default function PieChart ()  {
    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <>
            <Pie
                data={data as ChartData<"pie", (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>}
                options={options as ChartOptions<'pie'>}
            />
        </>
    );
};


