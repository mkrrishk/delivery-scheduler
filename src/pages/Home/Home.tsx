import { useEffect, useState } from 'react';
import DatePicker from 'components/DatePicker/DatePicker';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import Loader from 'components/Loader';
import useIsMounted from 'hooks/useIsMounted';
import { getAvailableDeliveryTimes } from 'services/DeliveryService';
import { DeliveryTime } from 'types/DeliveryTime';
import { getformattedDate } from 'utils/DateUtil';
import styles from './Home.module.css';

type RadioGroupItem = {
  label: DeliveryTime,
  value: DeliveryTime
}

const Home = () => {
  const [deliveryDate, setDeliveryDate] = useState<string>();
  const [radioGroupItems, setRadioGroupItems] = useState<RadioGroupItem[]>([]);
  const [deliveryTime, setDeliveryTime] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useIsMounted();

  const onDateChange = (selectedDate: string) => {
    setDeliveryDate(selectedDate);
  };

  const onRadioInputChange = (selectedTime: string) => {
    setDeliveryTime(selectedTime);
  };

  useEffect(() => {
    if (!deliveryDate) return;

    const fetchDeliveryTimes = async () => {
      try {
        setIsLoading(true);
        const availableDeliveryTimes = await getAvailableDeliveryTimes(new Date(deliveryDate));
        if (isMounted()) {
          setRadioGroupItems(availableDeliveryTimes.map((availableTime) => ({
            label: availableTime,
            value: availableTime
          })));
        }
      } catch (error) {
        console.log(`Error fetching Available Delivery Times ${error}`);
      }
      finally {
        if (isMounted()) setIsLoading(false);
      }
    };

    setDeliveryTime(undefined);
    fetchDeliveryTimes();
  }, [deliveryDate, isMounted])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Delivery Slot</h2>
      <DatePicker
        title="Delivery Date"
        minDate={getformattedDate()}
        onDateChange={onDateChange}
      />
      {isLoading ? <Loader /> : null}
      {!isLoading && deliveryDate && radioGroupItems && radioGroupItems.length ?
        <RadioGroup
          title="Delivery Time"
          name="delivery-time"
          defaultValue={deliveryTime}
          items={radioGroupItems}
          onRadioInputChange={onRadioInputChange}
        />
        : null
      }
      {!isLoading && deliveryDate && (!radioGroupItems || !radioGroupItems.length) ?
        <p className={styles.message}>
          Sorry! no Delivery Slots are available on
          {` ${getformattedDate(new Date(deliveryDate), 'dd-mm-yyyy')}`}
        </p>
        : null
      }
      {!isLoading && deliveryDate && deliveryTime ?
        <p className={styles.message}>
          Your Order will be delivered on
          {` ${getformattedDate(new Date(deliveryDate), 'dd-mm-yyyy')} at ${deliveryTime}`}
        </p>
        : null
      }
    </div>
  );
}

export default Home;
