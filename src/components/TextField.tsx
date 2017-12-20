import * as React from 'react';
import './TextField.css';

export interface Props {
  placeholder: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export default function ({ placeholder, value, onChangeValue }: Props) {
  return (
    <div className="textField">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={event => onChangeValue(event.target.value)}
      />
    </div>
  );
}
