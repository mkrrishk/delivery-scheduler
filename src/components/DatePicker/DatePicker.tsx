import React from 'react';
import './DatePicker.css';

interface DatePickerProps {
  title: string,
  minDate?: string,
  maxDate?: string,
  onDateChange: (text: string) => void
}

const DatePicker = ({ title, minDate, maxDate, onDateChange }: DatePickerProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(event.target.value);
  };

  return (
    <div>
      <label className="title" htmlFor="date-input">{title}</label>
      <input
        type="date"
        id="date-input"
        min={minDate}
        max={maxDate}
        // onKeyDown={(event) => event.preventDefault()}
        onChange={handleChange}
      />
    </div>
  );
}

export default DatePicker;
