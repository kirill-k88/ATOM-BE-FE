import { FC } from 'react';
import { useSelector } from 'react-redux';
import { TableVirtuoso } from 'react-virtuoso';

import { RootState } from '../../store/store';
import { Work } from '../Work/Work';

import styles from './TableWorks.module.scss';

export const TableWorks: FC = () => {
  const works = useSelector((state: RootState) => state.worksReducer);

  return (
    <TableVirtuoso
      className={styles.virtuozo}
      data={works.works}
      components={{
        Table: ({ ...props }) => (
          <table
            {...props}
            className={styles.table}
          />
        )
      }}
      fixedHeaderContent={() => (
        <tr className={styles.tableRow}>
          <th className={styles.tableHeader}>Объект</th>
          <th className={styles.tableHeader}>Работа</th>
          <th className={styles.tableHeader}>Дата</th>
          <th className={styles.tableHeader}>План. сумм.</th>
          <th className={styles.tableHeader}>Факт. сумм.</th>
        </tr>
      )}
      itemContent={(_, w) => <Work work={w} />}
    />
  );
};
