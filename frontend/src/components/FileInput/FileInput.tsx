import { FC, useState } from 'react';

import styles from './FileInput.module.scss';
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';
import { FormikErrors } from 'formik';
import { TFile } from '../../utils/types/types';

interface IFileInputProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<{
    file: TFile;
  }>>;
  errors: FormikErrors<{
    file: TFile;
  }>;
}

export const FileInput: FC<IFileInputProps> = ({ setFieldValue, errors }) => {
  const [fileName, setFiuleName] = useState('');
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFieldValue('file', acceptedFiles[0]);
      setFiuleName(
        `${acceptedFiles[0].name} (${
          acceptedFiles[0].size > 1024 * 1024
            ? (acceptedFiles[0].size / (1024 * 1024)).toFixed(2) + ' Мбайт'
            : acceptedFiles[0].size > 1024
            ? (acceptedFiles[0].size / 1024).toFixed(2) + ' Кбайт'
            : acceptedFiles[0].size + ' байт'
        })`
      );
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive
  }: {
    getRootProps: (props?: DropzoneRootProps | undefined) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps;
    isDragActive: boolean;
  } = useDropzone({ onDrop });

  return (
    <div className={styles.fileInput}>
      <div
        {...getRootProps()}
        className={styles.fileInput__inputContainer}>
        {fileName && <span>Выбран: {fileName}</span>}
        <input
          {...getInputProps()}
          id="file"
          name="file"
          type="file"
          accept=".json"
        />
        {isDragActive ? (
          <p>Отпустите файл здесь ...</p>
        ) : (
          <p>Перетащите файл сюда или нажмите для выбора</p>
        )}
        {errors.file && <span className={styles.fileInput__span}>{errors.file}</span>}
      </div>
    </div>
  );
};
