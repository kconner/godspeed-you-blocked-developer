import * as React from 'react';
import './TextField.css';

export interface Props {
  title: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export default function ({ title, value, onChangeValue }: Props) {
  return (
    <div className="textField">
      {title}: <input type="text" value={value} onChange={(event) => onChangeValue(event.target.value)} />
    </div>
  );
}
