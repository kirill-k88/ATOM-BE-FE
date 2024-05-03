import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { getMonth } from '../../utils/functions';
import { RootState } from '../../store/store';
import styles from './BarGroups.module.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarGroups: FC = () => {
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
      max_plan = g.total_plan_sum;
      min_plan = g.total_plan_sum;
      max_fact = g.total_fact_sum;
      min_fact = g.total_fact_sum;
    }
    labels.push(`${getMonth(g.work_month)}.${g.work_year}`);
    plans.push(g.total_plan_sum);
    if (g.total_plan_sum > max_plan) max_plan = g.total_plan_sum;
    console.log(g.total_plan_sum, max_plan);
    if (g.total_plan_sum < min_plan) min_plan = g.total_plan_sum;
    facts.push(g.total_fact_sum);
    if (g.total_fact_sum > max_fact) max_fact = g.total_fact_sum;
    if (g.total_fact_sum < min_fact) min_fact = g.total_fact_sum;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Плановые суммы',
        data: plans,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        stack: 'Stack 0'
      },
      {
        label: 'Фактические суммы',
        data: facts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        stack: 'Stack 1'
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Сравнение планов и фактов по заданному фильтру'
      }
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <Bar
      className={styles.chart}
      options={options}
      data={data}
    />
  );
};
