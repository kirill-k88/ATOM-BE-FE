import { FC } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';

import styles from './TableGroupedWorks.module.scss';
import { RootState } from '../../store/store';
import { WorkGroup } from '../WorkGroup/WorkGroup';

export const TableGroupedWorks: FC = () => {
  const groupedWorks = useSelector((state: RootState) => state.groupedWorksReducer);

  return (
    <TableVirtuoso
      className={styles.virtuozo}
      data={groupedWorks.groupedWorks}
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
          <th className={styles.tableHeader}>Месяц</th>
          <th className={styles.tableHeader}>Год</th>
          <th className={styles.tableHeader}>План. сумм.</th>
          <th className={styles.tableHeader}>Факт. сумм.</th>
          {groupedWorks.withCommulative && (
            <>
              <th className={styles.tableHeader}>Накоп. план. сумм.</th>
              <th className={styles.tableHeader}>Накоп. факт. сумм.</th>
            </>
          )}
        </tr>
      )}
      itemContent={(_, g) => <WorkGroup group={g} />}
    />
  );
};
