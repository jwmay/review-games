export default function NavbarMenuButton() {
  return (
    <button className='btn btn-ghost rounded-field' role='button' tabIndex={0}>
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
  )
}
