import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { getWorks } from '../../store/slices/worksSlice';
import { FilterFrom } from '../FilterFrom/FilterFrom';
import { Table } from '../Table/Table';
import { Chart } from '../Chart/Chart';

import './App.css';

export const App: FC = () => {
  const works = useSelector((state: RootState) => state.worksReducer);
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
        <Table />
        <Chart works={works.works} />
      </div>
    </div>
  );
};
