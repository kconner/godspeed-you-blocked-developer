import * as React from 'react'

export interface Props {
    optionValues: string[]
    value: string
    onChangeValue: (value: string) => void
}

export default ({ optionValues, value, onChangeValue }: Props) => (
    <div className="select">
        <select onChange={event => onChangeValue(event.target.value)}>
            <option key="_NoSelectedPlan" value="">
                —
            </option>
            {optionValues.map(optionValue => (
                <option key={optionValue} value={optionValue} selected={optionValue === value}>
                    {optionValue}
                </option>
            ))}
        </select>
    </div>
)
