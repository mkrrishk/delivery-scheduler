import { getExistingOrders } from 'services/OrderService';
import { DeliveryTimes } from 'types/DeliveryTime';
import { Orders, OrderTimeCount, OrderTimeCounts } from 'types/Order';
import { getDayOfWeek } from 'utils/DateUtil';
import { deliveryTimes, limitForMonday, limitForOtherDays } from 'utils/Constants';

export const getAvailableDeliveryTimes = async (date: Date): Promise<DeliveryTimes> => {

  const dayOfWeek = getDayOfWeek(date);
  const existingOrders = await getExistingOrders(date);

  if (!existingOrders || !existingOrders.length) {
    return deliveryTimes;
  }

  // Get Default Delivery Times with Order Count Set to Zero
  const defaultOrderTimeCounts = getDefaultDeliveryTimeOrderCounts();

  // Get Delivery Times with order count for Existing Orders
  const existingOrderTimeCounts = getExistingDeliveryTimeOrderCounts(existingOrders);

  // Merge Default & Existing Delivery Times by summing their order counts
  const deliveryTimeWithOrderCounts = getDeliveryTimeWithOrderCounts(
    defaultOrderTimeCounts, existingOrderTimeCounts
  );

  return deliveryTimeWithOrderCounts
    .filter((obj) => (
      obj.count < getDeliveryLimit(dayOfWeek)
    ))
    .map((entry) => (entry.time));
};

const getDefaultDeliveryTimeOrderCounts = (): OrderTimeCounts => {
  return deliveryTimes.map((deliveryTime) => ({
    time: deliveryTime,
    count: 0
  }));
};

const getExistingDeliveryTimeOrderCounts = (existingOrders: Orders): OrderTimeCounts => {
  return Array.from(
    existingOrders.reduce((result, { time }) => {
      let value = result.get(time)
      value ? value.count++ : result.set(time, { time, count: 1 })
      return result;
    }, new Map()).values()
  );
};

const getDeliveryTimeWithOrderCounts = (defaultDeliveryTimeOrderCounts: OrderTimeCounts,
  existingOrderDeliveryTimeCounts: OrderTimeCounts): OrderTimeCounts => {
  return [...defaultDeliveryTimeOrderCounts, ...existingOrderDeliveryTimeCounts]
    .reduce((acc: OrderTimeCounts, currentValue) => {
      let element = acc.find((item: OrderTimeCount) => item.time === currentValue.time)
      element ? element.count += currentValue.count : acc.push(currentValue)
      return acc
    }, []);
};

const getDeliveryLimit = (dayOfWeek: string) => {
  return dayOfWeek === 'Monday' ? limitForMonday : limitForOtherDays;
};