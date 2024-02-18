import { ChartData, ChartOptions } from "chart.js";

export const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
      
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: 'black', // Change text color of month labels
            }
        },
        y: {
            grid: {
                display: true,
            },
            max: 600,
            ticks: {
                stepSize: 200,
                color: 'black', // Change text color of y-axis ticks
            }
        },
    }
};

export const data: ChartData<'bar', (number | null)[], unknown> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            data: [500, 200, 33, 44, 12, 312, 123, 100, 200, 50, 20, 40],
            backgroundColor: '#7afdc9',
            borderRadius: 15,
            borderSkipped: false,
        },
    ],
};

