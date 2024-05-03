import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import type { TGroupedWorks } from '../../utils/types/types';

import styles from './WorkGroup.module.scss';
import { getMonth } from '../../utils/functions';

interface IWorkGroupProps {
  group: TGroupedWorks;
}

export const WorkGroup: FC<IWorkGroupProps> = ({ group }) => {
  const groupedWorks = useSelector((state: RootState) => state.groupedWorksReducer);

  return (
    <>
      <td className={styles.cell}>{group.object_name}</td>
      <td className={styles.cell}>{group.work_type}</td>
      <td className={styles.cell}>{getMonth(group.work_month)}</td>
      <td className={styles.cell}>{group.work_year}</td>
      <td className={styles.cell}>{group.total_plan_sum}</td>
      <td className={styles.cell}>{group.total_fact_sum}</td>
      {groupedWorks.withCommulative && (
        <>
          <td className={styles.cell}>{group.cumulative_plan_sum}</td>
          <td className={styles.cell}>{group.cumulative_fact_sum}</td>
        </>
      )}
    </>
  );
};
