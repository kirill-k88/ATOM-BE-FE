import { useEffect, type FC } from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getWorks } from '../../store/slices/worksSlice';
import { Work } from '../Work/Work';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const works = useSelector((state: RootState) => state.worksReducer);
  useEffect(() => {
    dispatch(
      getWorks({ period_start_in: '', period_end_in: '', object_name_in: '', work_type_in: '' })
    );
  }, []);

  return (
    <div className="mainContainer">
      <ul>
        {works.works.map(w => (
          <Work key={w.id} work={w} />
        ))}
      </ul>
    </div>
  );
};
