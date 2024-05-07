import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { TFile } from '../../utils/types/types';
import { postWorks } from '../../store/slices/worksFileSlice';
import { AppDispatch } from '../../store/store';

import { validationSchema } from './model/validationSchema/validationSchema';
import { FileInput } from '../FileInput/FileInput';
import styles from './ReadFileForm.module.scss';

export const ReadFileForm: FC = () => {
  const displatch = useDispatch<AppDispatch>();

  return (
    <Formik
      initialValues={{
        file: undefined
      }}
      validationSchema={validationSchema}
      onSubmit={(values: { file: TFile }, formikHelper) => {
        if (values.file) {
          displatch(postWorks([values.file, formikHelper]));
        }
      }}>
      {({ errors, isSubmitting, setFieldValue }) => (
        <Form className={styles.fileForm}>
          <div className={styles.fileForm__line}>
            <label htmlFor="file">Выбрать json-файл с работами</label>

            <button
              className={styles.fileForm__button}
              type="submit"
              disabled={isSubmitting}>
              Загрузить на сервер
            </button>
          </div>
          <FileInput
            errors={errors}
            setFieldValue={setFieldValue}
          />
        </Form>
      )}
    </Formik>
  );
};
