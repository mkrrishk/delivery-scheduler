import { DeliveryTimes } from 'types/DeliveryTime';

export const requestHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export const deliveryTimes: DeliveryTimes = ['10:30', '12:30', '18:30'];

export const limitForMonday = 4;

export const limitForOtherDays = 2;
