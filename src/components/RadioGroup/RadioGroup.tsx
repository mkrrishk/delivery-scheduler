import { useState } from 'react';
import './RadioGroup.css';

type RadioItem = {
  label: string,
  value: string
}

interface RadioGroupProps {
  title: string,
  name: string,
  defaultValue: string | undefined;
  items: RadioItem[],
  onRadioInputChange: (text: string) => void
}

const RadioGroup = ({ title, name, defaultValue, items, onRadioInputChange }: RadioGroupProps) => {

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedValue = event.target.value;
    setSelectedValue(checkedValue);
    onRadioInputChange(checkedValue);
  };

  return (
    <div>
      <div className="title" data-testid="radio-group-title">{title}</div>
      <div className="radio-container" data-testid="radio-group-container" onChange={handleChange}>
        {items.map((item) => (
          <div key={item.value}>
            <input
              type="radio"
              id={item.value}
              name={name}
              value={item.value}
              checked={selectedValue === item.value}
              onChange={e => {}}
              data-testid="radio-input"
            />
            <label htmlFor={item.value} data-testid="radio-input-label">{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
