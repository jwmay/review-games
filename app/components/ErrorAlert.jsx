import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'

export default function ErrorAlert({ children, className }) {
  return (
    <div
      role='alert'
      className={`alert alert-error text-white p-6 ${className}`}
    >
      <FontAwesomeIcon color='white' icon={faBug} size='xl' />
      <span>{children}</span>
    </div>
  )
}
