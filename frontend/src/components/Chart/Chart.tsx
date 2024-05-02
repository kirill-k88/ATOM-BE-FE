import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TWork } from '../../utils/types/types';

import styles from './Chart.module.scss';
import { parseDate } from '../../utils/functions';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IChartProps {
  works: TWork[];
}

export const Chart: FC<IChartProps> = ({ works }) => {
  const labels: string[] = [];
  const plans: number[] = [];
  const facts: number[] = [];

  works.forEach(w => {
    labels.push(parseDate(w.work_date));
    plans.push(w.plan_sum);
    facts.push(w.fact_sum);
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Плановые суммы',
        data: plans,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Фактические суммы',
        data: facts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        ticks: {
          padding: 20
        }
      }
    }
  };

  return <Line className={styles.chart} options={options} data={data}></Line>;
};
