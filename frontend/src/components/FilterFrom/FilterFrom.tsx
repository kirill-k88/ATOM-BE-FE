import { Field, Form, Formik } from 'formik';
import { type FC } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store';
import { getWorks } from '../../store/slices/worksSlice';
import type { Ifilter } from '../../utils/types/types';

import styles from './FilterFrom.module.scss';

export const FilterFrom: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      initialValues={{
        period_start: '',
        period_end: '',
        object_name: '',
        work_type: ''
      }}
      onSubmit={(values: Ifilter, formikHelper) => {
        dispatch(getWorks([values, formikHelper]));
      }}>
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <h2>Задать фильтр</h2>
          <div className={styles.form__line}>
            <label htmlFor="period_start">С</label>
            <Field
              id="period_start"
              name="period_start"
              type="date"
            />

            <label htmlFor="period_end">По</label>
            <Field
              id="period_end"
              name="period_end"
              type="date"
            />

            <label htmlFor="object_name">Объект</label>
            <Field
              id="object_name"
              name="object_name"
              type="text"
            />

            <label htmlFor="work_type">Работы</label>
            <Field
              id="work_type"
              name="work_type"
              type="text"
            />
          </div>
          <button
            className={styles.form__button}
            type="submit"
            disabled={isSubmitting}>
            Применить
          </button>
        </Form>
      )}
    </Formik>
  );
};
