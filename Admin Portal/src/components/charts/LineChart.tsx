import { memo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

interface LineChartProps {
  labels: string[]
  values: number[]
}

function LineChartComponent({ labels, values }: LineChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Trend',
        data: values,
        borderColor: 'rgba(124, 58, 237, 1)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' } },
    },
  } as const

  return <Line data={data} options={options} />
}

export const LineChart = memo(LineChartComponent)


