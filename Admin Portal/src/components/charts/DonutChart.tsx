import { memo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DonutChartProps {
  labels: string[]
  values: number[]
}

function DonutChartComponent({ labels, values }: DonutChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Share',
        data: values,
        backgroundColor: [
          'rgba(124, 58, 237, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0,
      },
    ],
  }
  const options = { responsive: true, plugins: { legend: { position: 'bottom' as const } } }
  return <Doughnut data={data} options={options} />
}

export const DonutChart = memo(DonutChartComponent)


