import { type FC } from 'react';

import type { TWork } from '../../utils/types/types';
import { parseDate } from '../../utils/functions';

import styles from './Work.module.scss';

interface IWorkProps {
  work: TWork;
}

export const Work: FC<IWorkProps> = ({ work }) => {
  return (
    <>
      <td className={styles.cell}>{work.object_name}</td>
      <td className={styles.cell}>{work.work_type}</td>
      <td className={styles.cell}>{parseDate(work.work_date)}</td>
      <td className={styles.cell}>{work.plan_sum}</td>
      <td className={styles.cell}>{work.fact_sum}</td>
    </>
  );
};
