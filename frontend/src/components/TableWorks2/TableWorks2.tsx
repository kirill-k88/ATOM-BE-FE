import { type FC, useMemo } from 'react';
import '@tanstack/react-table/dist/styles.css';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';

export const TableWorks2: FC = () => {
  const works = useSelector((state: RootState) => state.worksReducer);
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Название объекта', accessor: 'object_name' },
      { Header: 'Тип работы', accessor: 'work_type' },
      { Header: 'Дата работы', accessor: 'work_date' },
      { Header: 'Плановая сумма', accessor: 'plan_sum' },
      { Header: 'Фактическая сумма', accessor: 'fact_sum' }
    ],
    []
  );

  return (
    <Table
      data={works}
      columns={columns}
      getRowProps={() => ({ style: { cursor: 'pointer' } })}
    />
  );
};
