
export const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                color: '#cbc6c6',
                font: {
                    family: 'Belanosima'
                }
            }
        },
    }
}
export const data = {
    labels: [
        'Adrian Bui',
        'Mary Han',
        'Dino Phi'
    ],
    datasets: [{

        data: [1200, 900, 700],
        backgroundColor: [
            '#7AFDC9',
            '#3c7d63',
            '#204436'
        ],
        hoverOffset: 4
    }]
};