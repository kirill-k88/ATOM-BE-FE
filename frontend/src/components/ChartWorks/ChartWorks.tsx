import { useSelector } from 'react-redux';
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

import styles from './ChartWorks.module.scss';
import { parseDate } from '../../utils/functions';
import { RootState } from '../../store/store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartWorks: FC = () => {
  const works = useSelector((state: RootState) => state.worksReducer);

  const labels: string[] = [];
  const plans: number[] = [];
  const facts: number[] = [];
  let max_plan = 0;
  let max_fact = 0;
  let min_plan = 0;
  let min_fact = 0;

  works.works.forEach((w, i) => {
    if (i === 0) {
      max_plan = w.plan_sum;
      min_plan = w.plan_sum;
      max_fact = w.fact_sum;
      min_fact = w.fact_sum;
    }
    labels.push(parseDate(w.work_date));
    plans.push(w.plan_sum);
    if (w.plan_sum > max_plan) max_plan = w.plan_sum;
    if (w.plan_sum < min_plan) min_plan = w.plan_sum;
    facts.push(w.fact_sum);
    if (w.fact_sum > max_fact) max_fact = w.fact_sum;
    if (w.fact_sum < min_fact) min_fact = w.fact_sum;
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
        display: true,
        text: 'Тренд по выбранным работам'
      }
    },
    scales: {
      y: {
        min:
          Math.min(min_plan, min_fact) -
          (Math.max(max_plan, max_fact) - Math.min(min_plan, min_fact)) * 0.1,
        max:
          Math.max(max_plan, max_fact) +
          (Math.max(max_plan, max_fact) - Math.min(min_plan, min_fact)) * 0.1
      }
    }
  };

  return <Line className={styles.chart} options={options} data={data}></Line>;
};
