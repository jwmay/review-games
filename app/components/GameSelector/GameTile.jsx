import { Link } from 'react-router'

export default function GameTile({ comingSoon, description, imageSrc, title }) {
  if (comingSoon) {
    return null
  } else {
    return (
      <Link to={`/${title.toLowerCase()}`}>
        <div className='card glass w-96'>
          <figure>
            <img src={imageSrc} alt={title} />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>{title}</h2>
            <p>{description}</p>
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Play</button>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}
