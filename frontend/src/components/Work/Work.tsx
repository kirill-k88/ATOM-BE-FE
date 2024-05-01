import { FC } from 'react';

import { TWork } from '../../utils/types/types';

import styles from './Work.module.scss';

interface IWorkProps {
  work: TWork;
}

export const Work: FC<IWorkProps> = ({ work }) => {
  return (
    <div className={styles.work}>
      <p>{work.object_name}</p>
      <p>{work.work_type}</p>
      <p>{work.work_date}</p>
      <p>{work.plan_sum}</p>
      <p>{work.fact_sum}</p>
    </div>
  );
};
