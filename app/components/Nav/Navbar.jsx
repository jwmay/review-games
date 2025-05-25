import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ title }) {
  const changeColorsButtonClick = () => {
    alert('clicked')
  }

  return (
    <nav className='navbar bg-base-100 mb-8'>
      <div className='navbar-start'>
        <Link to='/'>
          <button className='btn btn-ghost text-xl'>
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
      </div>
      <div className='navbar-center'>{title}</div>
      <div className='navbar-end'>
        <div className='dropdown dropdown-end'>
          <button
            className='btn btn-ghost rounded-field'
            role='button'
            tabIndex={0}
          >
            <svg
              className='inline-block h-5 w-5 stroke-current'
              fill='none'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              ></path>
            </svg>
          </button>
          <ul
            className='menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm'
            tabIndex={0}
          >
            <li>
              <button onClick={changeColorsButtonClick}>Change Colors</button>
            </li>
            {/* <li>
              <a>Item 2</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}
