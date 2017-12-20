import * as React from 'react';
import './Checkbox.css';

export interface Props {
  id: string;
  label: string;
  checked: boolean;
  enabled: boolean;
  onChangeChecked: (value: boolean) => void;
}

export default function ({ id, label, checked, enabled, onChangeChecked }: Props) {
  return (
    <span className="checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={!enabled}
        onChange={event => onChangeChecked(event.target.checked)}
      />
      <label htmlFor={id}> {label}</label>
    </span>
  );
}