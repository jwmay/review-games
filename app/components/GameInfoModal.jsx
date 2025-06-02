export default function GameInfoModal({ children, id, title }) {
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
