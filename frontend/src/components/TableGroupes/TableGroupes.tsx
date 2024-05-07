import { useMemo, type FC } from 'react';
import { useSelector } from 'react-redux';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

import { RootState } from '../../store/store';
import type { TGroupedWorks } from '../../utils/types/types';

import styles from './TableGroupes.module.scss';
import { getMonth } from '../../utils/functions';

const columnHelper = createColumnHelper<TGroupedWorks>();

export const TableGroupes: FC = () => {
  const groupedWorks = useSelector((state: RootState) => state.groupedWorksReducer);

  const columns = useMemo(() => {
    const arr = [
      columnHelper.accessor('object_name', {
        header: () => <span>Название объекта</span>,
        cell: info => info.getValue()
      }),
      columnHelper.accessor('work_type', {
        header: () => <span>Работы</span>,
        cell: info => info.getValue()
      }),
      columnHelper.accessor('work_month', {
        header: () => <span>Месяц</span>,
        cell: info => getMonth(info.getValue())
      }),
      columnHelper.accessor('work_year', {
        header: () => <span>Год</span>,
        cell: info => info.getValue()
      }),
      columnHelper.accessor('total_plan_sum', {
        header: () => <span>План. сумм.</span>,
        cell: info => info.getValue()
      }),
      columnHelper.accessor('total_fact_sum', {
        header: () => <span>Факт. сумм.</span>,
        cell: info => info.getValue()
      })
    ];

    const arrWithCommulative = [
      columnHelper.accessor('cumulative_plan_sum', {
        header: () => <span>Накоп. план. сумм.</span>,
        cell: info => info.getValue()
      }),
      columnHelper.accessor('cumulative_fact_sum', {
        header: () => <span>Накоп. факт. сумм.</span>,
        cell: info => info.getValue()
      })
    ];
    return groupedWorks.withCommulative ? [...arr, ...arrWithCommulative] : arr;
  }, [groupedWorks.withCommulative]);

  const table = useReactTable({
    data: groupedWorks.groupedWorks,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableHeader}>
        <thead className={styles.tableHeader__head}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
              className={styles.tableHeader__tr}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={styles.tableHeader__th}>
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
              <tr
                key={row.id}
                className={styles.tableBody__tr}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className={styles.tableBody__td}>
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
