import { Field, Form, Formik } from 'formik';
import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/store';
import { getGroupedWorks } from '../../store/slices/groupedWorksSlice';
import type { IgroupForm } from '../../utils/types/types';

import styles from './GroupFrom.module.scss';

export const GroupFrom: FC = () => {
  const filter = useSelector((state: RootState) => state.worksReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      initialValues={{
        withCommulative: false
      }}
      onSubmit={(values: IgroupForm, formikHelper) => {
        dispatch(getGroupedWorks([values, filter.filter, formikHelper]));
      }}>
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h2>Получить сгруппированные данные</h2>
          <div className={styles.form__line}>
            <label htmlFor="withCommulative">С накопительным итогом</label>
            <Field
              name="withCommulative"
              type="checkbox"
            />

            <button
              className={styles.form__button}
              type="submit"
              disabled={isSubmitting}>
              Применить
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
