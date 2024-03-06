import { BarElement, Tooltip, Legend, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { useSession } from 'next-auth/react';
import { axiosAuth } from '@/app/lib/axious';

const Revenue: React.FC = () => {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        Tooltip,
        Legend,
    );

    const { data: session } = useSession()
    const token = session?.user.accessToken;
    const [label, setLabel] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [maxValue, setMaxValue] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/DashBoard/monthly-revenues`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dashboardData = response.data;
                setLabel(dashboardData.labels);
                setChartData(dashboardData.data);

                const max = Math.max(...dashboardData.data) ;
                setMaxValue(max);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, []);

    const data: ChartData<'bar', (number | null)[], unknown> = {
        labels: label,
        datasets: [
            {
                data: chartData,
                backgroundColor: '#7afdc9',
                borderRadius: 15,
                borderSkipped: false,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
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
                max: maxValue,
                ticks: {
                    stepSize: 5000000,
                    color: 'black',
                }
            },
        }
    };

    return (
        <>
            <Bar
                data={data as ChartData<'bar', (number | null)[], unknown>}
                options={options as ChartOptions<'bar'>}
                style={{ padding: "20px" }}
            />
        </>
    );
};

export default Revenue;
