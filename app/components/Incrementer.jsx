import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Incrementer({
  description,
  initialValue,
  label,
  max,
  min,
  onChange,
}) {
  const [value, setValue] = useState(initialValue)

  const handleButtonClick = (event) => {
    const intent = event.target.value
    const val = parseInt(value)

    if (intent === 'decrement' && value !== min) {
      onChange(val - 1)
      setValue(val - 1)
    } else if (intent === 'increment' && value !== max) {
      onChange(val + 1)
      setValue(val + 1)
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value

    if (value === '' || value === '1') {
      setValue(value)
    }

    if (value >= min && value <= max) {
      onChange(parseInt(value))
      setValue(value)
    }
  }

  return (
    <div>
      {label && <label>{label}</label>}
      <div className='join'>
        <button
          className='btn btn-square join-item'
          disabled={value <= min}
          onClick={handleButtonClick}
          value='decrement'
        >
          <FontAwesomeIcon icon={faMinus} className='pointer-events-none' />
        </button>
        <input
          className='input validator join-item text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          max={max}
          min={min}
          onChange={handleInputChange}
          required
          title={description}
          type='number'
          value={value}
        />
        <button
          className='btn btn-square join-item'
          disabled={value >= max}
          onClick={handleButtonClick}
          value='increment'
        >
          <FontAwesomeIcon icon={faPlus} className='pointer-events-none' />
        </button>
      </div>
    </div>
  )
}
