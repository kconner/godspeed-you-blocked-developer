import * as React from 'react';
import './TextField.css';

export interface Props {
  label: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export default function ({ label, value, onChangeValue }: Props) {
  return (
    <div className="textField">
      {label}: <input type="text" value={value} onChange={(event) => onChangeValue(event.target.value)} />
    </div>
  );
}
