import { Bar, Line } from 'react-chartjs-2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import './styles.css';

const Graph = () => {

    const data = {
        labels: ['Zapelino', 'Oi', 'BRB', 'BRB Nação'],
        datasets: [
            {
                label: 'Quantidade de contas abertas',
                data: [2300, 1430, 550, 1000],
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                borderWidth: 2,
            }
        ]
    }

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );

    

    return (
        <>
        <div className="ChartCards">
        <Card sx={{ maxWidth: 545 }}>
            <CardContent>
                <Bar
                    data={data}
                    width={400}
                    height={200}
                    options={{ maintainAspectRatio: false }}
                />
            </CardContent>
        </Card>
        <br></br><br></br>
        <Card sx={{ maxWidth: 545 }}>
            <CardContent>
                <Line
                    data={data}
                    width={400}
                    height={200}
                    options={{ maintainAspectRatio: false }}
                />
            </CardContent>
        </Card>
        </div>
        </>
    );
}

export default Graph;