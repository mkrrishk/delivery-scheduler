import { DeliveryTime } from 'types/DeliveryTime';

export interface Order {
  date: string,
  time: DeliveryTime,
  orderId: string,
  customerId: string,
};

export type Orders = Order[];

export interface OrderTimeCount {
  time: DeliveryTime,
  count: number,
}

export type OrderTimeCounts = OrderTimeCount[];