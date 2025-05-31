import { useSearchParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Incrementer({
  description,
  initialValue,
  label,
  max,
  min,
  name,
}) {
  const [searchParams, setSearchParams] = useSearchParams({
    [name]: initialValue,
  })

  const handleButtonClick = (event) => {
    const intent = event.target.value
    const value = parseInt(searchParams.get(name))

    if (intent === 'decrement' && value !== min) {
      setSearchParams((params) => ({ ...params, [name]: value - 1 }))
    } else if (intent === 'increment' && value !== max) {
      setSearchParams((params) => ({ ...params, [name]: value + 1 }))
    }
  }

  const handleInputChange = (event) => {
    setSearchParams((params) => ({ ...params, [name]: event.target.value }))
  }

  return (
    <div>
      {label && <label>{label}</label>}
      <div className='join'>
        <button
          className='btn btn-square join-item'
          disabled={searchParams.get(name) <= min}
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
          value={searchParams.get(name)}
        />
        <button
          className='btn btn-square join-item'
          disabled={searchParams.get(name) >= max}
          onClick={handleButtonClick}
          value='increment'
        >
          <FontAwesomeIcon icon={faPlus} className='pointer-events-none' />
        </button>
      </div>
    </div>
  )
}
