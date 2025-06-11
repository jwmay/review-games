import { useState } from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompress,
  faEllipsisVertical,
  faExpand,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'

function NavbarMenuButton() {
  return (
    <button
      className='btn btn-ghost rounded-field ml-2'
      role='button'
      tabIndex={0}
    >
      <FontAwesomeIcon className='fa-lg' icon={faEllipsisVertical} />
    </button>
  )
}

export default function Navbar({ allowFullscreen, menu, title }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  function handleFullscreenToggleClick() {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {isFullscreen ? (
        <button
          className='btn btn-circle btn-ghost btn-lg absolute right-0 m-4 opacity-25 hover:opacity-100'
          onClick={handleFullscreenToggleClick}
        >
          <FontAwesomeIcon className='fa-xl' icon={faCompress} />
        </button>
      ) : (
        <nav
          className='navbar bg-base-100'
          style={{ display: isFullscreen ? 'none' : 'flex' }}
        >
          <div className='navbar-start'>
            <Link to='/'>
              <button className='btn btn-ghost text-xl'>
                <FontAwesomeIcon icon={faHouse} />
              </button>
            </Link>
          </div>
          <div className='navbar-center'>{title}</div>
          <div className='navbar-end'>
            {allowFullscreen && (
              <button
                className='btn btn-ghost rounded-field'
                onClick={handleFullscreenToggleClick}
              >
                <FontAwesomeIcon className='fa-lg' icon={faExpand} />
              </button>
            )}
            {menu && (
              <div className='dropdown dropdown-end'>
                <NavbarMenuButton />
                <ul
                  className='dropdown-content menu menu-lg bg-base-200 rounded-box z-1 mt-4 min-w-60 p-2 shadow-sm'
                  tabIndex={0}
                >
                  {menu}
                </ul>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
