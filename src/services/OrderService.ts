import { Order, Orders } from 'types/Order';
import { getDayOfWeek, getformattedDate } from 'utils/DateUtil';
import { requestHeaders } from 'utils/Constants';

export const getExistingOrders = async (date: Date): Promise<Orders> => {

  const dayOfWeek = getDayOfWeek(date);

  return await
    fetch(`${process.env.REACT_APP_ORDERS_API_URL}`, { headers: requestHeaders })
      .then(response => response.json())
      .then(data => data[dayOfWeek].map((order: Order) => (
        { ...order, date: getformattedDate(date) }
      )))
      .catch(error => { console.log(`Error fetching Existing Orders ${error}`) });
};