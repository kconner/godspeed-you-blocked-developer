import * as React from 'react'
import './TextField.css'

export interface Props {
    placeholder: string
    value: string
    autofocus?: boolean
    onChangeValue: (value: string) => void
}

export default ({ placeholder, value, autofocus, onChangeValue }: Props) => (
    <div className="textField">
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            autoFocus={autofocus || false}
            onChange={event => onChangeValue(event.target.value)}
        />
    </div>
)
