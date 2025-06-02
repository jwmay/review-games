import { Link } from 'react-router'

export default function GameTile({
  comingSoon,
  description,
  imageSrc,
  learnMoreModal,
  title,
}) {
  if (comingSoon) {
    return null
  } else {
    return (
      <div className='card glass w-96 h-[560px]'>
        <figure>
          <img src={imageSrc} alt={title} />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <p>{description}</p>
          <div className='card-actions justify-end'>
            {learnMoreModal}
            <Link className='btn btn-accent' to={`/${title.toLowerCase()}`}>
              Play
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
