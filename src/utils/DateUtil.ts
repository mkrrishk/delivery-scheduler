import { DaysOfWeek } from 'types/DaysOfWeek';

export const getformattedDate = (dateToFormat?: Date, format? : string) => {
  const date = dateToFormat || new Date();
  const isoFormattedDate = date.toISOString().split('T')[0];
  return format === 'dd-mm-yyyy' ? 
    isoFormattedDate.split('-').reverse().join('-') : isoFormattedDate;
}

export const getDayOfWeek = (date: Date) => {
  return DaysOfWeek[date.getDay()];
}
