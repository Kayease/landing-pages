import { memo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  values: number[]
}

function BarChartComponent({ labels, values }: BarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Value',
        data: values,
        backgroundColor: 'rgba(124, 58, 237, 0.6)',
        borderRadius: 6,
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

  return <Bar data={data} options={options} />
}

export const BarChart = memo(BarChartComponent)


