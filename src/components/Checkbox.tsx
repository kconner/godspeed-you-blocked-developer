import * as React from 'react';
import './Checkbox.css';

export interface Props {
  checked: boolean;
  enabled: boolean;
  onChangeChecked: (value: boolean) => void;
}

export default function ({ checked, enabled, onChangeChecked }: Props) {
  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={checked}
      disabled={!enabled}
      onChange={event => onChangeChecked(event.target.checked)}
    />
  );
}
