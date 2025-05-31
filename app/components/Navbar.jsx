import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import NavbarMenuButton from './NavbarMenuButton'

export default function Navbar({ menu, title }) {
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
      {menu && (
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <NavbarMenuButton />
            <ul
              className='menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm'
              tabIndex={0}
            >
              {menu}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}
