import { format } from 'date-fns';

export const parseDate = (sDate: string) => {
  const date = new Date(sDate);

  const formattedDate = format(date, 'dd.MM.yyyy');

  return formattedDate;
};
