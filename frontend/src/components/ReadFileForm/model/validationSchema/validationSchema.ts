import * as Yup from 'yup';

import { VALIDATION_FILE_ERROR } from '../../../../utils/constants/constants';

export const validationSchema = Yup.object().shape({
  file: Yup.mixed().required(VALIDATION_FILE_ERROR)
});
