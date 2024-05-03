import { format } from 'date-fns';
import { MONTHS } from './constants/constants';

export const parseDate = (sDate: string) => {
  const date = new Date(sDate);

  const formattedDate = format(date, 'dd.MM.yyyy');

  return formattedDate;
};

type TMonths = typeof MONTHS;

export const getMonth = (m: number) => {
  if (m > 0 && m < 13) {
    return MONTHS[m as keyof TMonths];
  }
  return null;
};
