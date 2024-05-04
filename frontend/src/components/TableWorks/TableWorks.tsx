import { type FC } from 'react';
import { useSelector } from 'react-redux';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { RootState } from '../../store/store';
import { TWork } from '../../utils/types/types';
import { parseDate } from '../../utils/functions';

import styles from './TableWorks.module.scss';

const columnHelper = createColumnHelper<TWork>();

const columns = [
  columnHelper.accessor('object_name', {
    header: () => <span>Название объекта</span>,
    cell: info => info.getValue()
  }),
  columnHelper.accessor('work_type', {
    header: () => <span>Работы</span>,
    cell: info => info.getValue()
  }),
  columnHelper.accessor('work_date', {
    header: () => <span>Дата</span>,
    cell: info => parseDate(info.getValue())
  }),
  columnHelper.accessor('plan_sum', {
    header: () => <span>План. сумм.</span>,
    cell: info => info.getValue()
  }),
  columnHelper.accessor('fact_sum', {
    header: () => <span>Факт. сумм.</span>,
    cell: info => info.getValue()
  })
];

export const TableWorks: FC = () => {
  const works = useSelector((state: RootState) => state.worksReducer);
  const table = useReactTable({
    data: works.works,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableHeader}>
        <thead className={styles.tableHeader__head}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.tableHeader__tr}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={styles.tableHeader__th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <div className={styles.tableBody__container}>
        <table className={styles.tableBody}>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className={styles.tableBody__tr}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={styles.tableBody__td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
