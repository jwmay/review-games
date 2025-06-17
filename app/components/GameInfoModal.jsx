import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Entry({ children, color, faIcon, title }) {
  return (
    <li className='list-row mb-12 last-of-type:mb-0'>
      <div>
        <FontAwesomeIcon
          className={'text-warning fa-3x'}
          fixedWidth
          icon={faIcon}
        />
      </div>
      <div>
        <h2 className={`text-${color} text-3xl mb-6`}>{title}</h2>
        <div className='text-lg pb-4'>{children}</div>
      </div>
    </li>
  )
}

export function GameInfoModal({ children, id, title }) {
  return (
    <>
      <button
        className='btn btn-soft btn-info'
        onClick={() => document.getElementById(id).showModal()}
      >
        Learn more
      </button>
      <dialog id={id} className='modal'>
        <div className='modal-box max-w-3/5 h-4/5 px-16 pt-12'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
            <h3 className='font-bold text-5xl mb-12'>{title}</h3>
            {children}
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export function Step({ children }) {
  return (
    <li
      className='step step-primary'
      style={{
        gap: 30,
        gridRowStart: 'auto',
        minHeight: '9rem',
        textAlign: 'left',
      }}
    >
      <p className=''>{children}</p>
    </li>
  )
}
