import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare as faSquareOpen } from '@fortawesome/free-regular-svg-icons'
import { Rating } from 'react-simple-star-rating'

export default function SabotageGameRow({
  color,
  initialValue,
  numBoxes,
  onChange,
  title,
}) {
  return (
    <div className='divide-x flex items-center' id='gameRow'>
      <h1
        className='font-semibold min-w-32 text-xl'
        id='gameRowTitle'
        style={{ color }}
      >
        {title}
      </h1>
      <span className='pl-10' id='gameRowBoxes'>
        <Rating
          initialValue={initialValue}
          onClick={onChange}
          emptyColor={color}
          emptyIcon={
            <FontAwesomeIcon icon={faSquareOpen} size='3x' className='mr-4' />
          }
          fillColor={color}
          fillIcon={
            <FontAwesomeIcon icon={faSquare} size='3x' className='mr-4' />
          }
          iconsCount={numBoxes}
          transition
        />
      </span>
    </div>
  )
}
