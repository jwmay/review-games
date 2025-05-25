import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare as faSquareOpen } from '@fortawesome/free-regular-svg-icons'
import { Rating } from 'react-simple-star-rating'

import useGenerateRandomColor from '../../hooks/useGenerateRandomColor'

export default function GameRow({ title }) {
  const numBoxes = 20

  const color = useGenerateRandomColor()

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
          emptyColor={color}
          emptyIcon={
            <FontAwesomeIcon icon={faSquareOpen} size='3x' className='mr-4' />
          }
          fillColor={color}
          fillIcon={
            <FontAwesomeIcon icon={faSquare} size='3x' className='mr-4' />
          }
          iconsCount={numBoxes}
        />
      </span>
    </div>
  )
}
