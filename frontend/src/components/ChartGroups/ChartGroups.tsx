import { FC } from 'react';
import { useSelector } from 'react-redux';
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

import { getMonth } from '../../utils/functions';
import styles from './ChartGroups.module.scss';
import { RootState } from '../../store/store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartGroups: FC = () => {
  const groups = useSelector((state: RootState) => state.groupedWorksReducer);

  const labels: string[] = [];
  const plans: number[] = [];
  const facts: number[] = [];
  let max_plan = 0;
  let max_fact = 0;
  let min_plan = 0;
  let min_fact = 0;

  groups.groupedWorks.forEach((g, i) => {
    if (i === 0) {
      max_plan = g.cumulative_plan_sum;
      min_plan = g.cumulative_plan_sum;
      max_fact = g.cumulative_fact_sum;
      min_fact = g.cumulative_fact_sum;
    }
    labels.push(`${getMonth(g.work_month)}.${g.work_year}`);
    plans.push(g.cumulative_plan_sum);
    if (g.cumulative_plan_sum > max_plan) max_plan = g.cumulative_plan_sum;
    console.log(g.cumulative_plan_sum, max_plan);
    if (g.cumulative_plan_sum < min_plan) min_plan = g.cumulative_plan_sum;
    facts.push(g.cumulative_fact_sum);
    if (g.cumulative_fact_sum > max_fact) max_fact = g.cumulative_fact_sum;
    if (g.cumulative_fact_sum < min_fact) min_fact = g.cumulative_fact_sum;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Накоп. плановые суммы',
        data: plans,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Накоп. фактические суммы',
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
        text: 'Накопительный итог по заданному фильтру'
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

  return (
    <Line
      className={styles.chart}
      options={options}
      data={data}></Line>
  );
};
