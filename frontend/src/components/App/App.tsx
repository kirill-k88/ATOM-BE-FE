import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { getWorks } from '../../store/slices/worksSlice';
import { FilterFrom } from '../FilterFrom/FilterFrom';
import { TableWorks } from '../TableWorks/TableWorks';
import { ChartWorks } from '../ChartWorks/ChartWorks';

import './App.css';
import { GroupFrom } from '../GroupFrom/GroupFrom';
import { TableGroupedWorks } from '../TableGroupedWorks/TableGroupedWorks';
import { ChartGroups } from '../ChartGroups/ChartGroups';
import { BarGroups } from '../BarGroups/BarGroups';

export const App: FC = () => {
  const groupedWorks = useSelector((state: RootState) => state.groupedWorksReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getWorks([{ period_start: '', period_end: '', object_name: '', work_type: '' }, null])
    );
  }, []);

  return (
    <div className="mainContainer">
      <FilterFrom />
      <div className="worksContainer">
        <TableWorks />
        <ChartWorks />
      </div>
      <GroupFrom />
      <div className="worksContainer">
        <TableGroupedWorks />
        <div className="chartsContainer">
          <BarGroups />
          {groupedWorks.withCommulative && <ChartGroups />}
        </div>
      </div>
    </div>
  );
};
