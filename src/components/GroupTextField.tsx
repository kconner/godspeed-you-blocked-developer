import * as React from 'react';
import './GroupTextField.css';

export interface Props {
  group: string;
  onChangeGroup: (group: string) => void;
}

export default function ({ group, onChangeGroup }: Props) {
  return (
    <div className="groupTextField">
      Group: <input type="text" value={group} onChange={(event) => onChangeGroup(event.target.value)} />
    </div>
  );
}
