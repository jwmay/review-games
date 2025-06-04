import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'

export default function JeopardyFileInput({
  disabled,
  initialValue,
  loading,
  onChange,
}) {
  const [value, setValue] = useState(initialValue)

  function handleInputChange(event) {
    setValue(event.target.value)
  }

  function handleOpenButtonClick() {
    const regex = /\/d\/(.+)\//
    const match = value.match(regex)
    const sheetId = match ? match[1] : null
    onChange({ sheetId, sheetUrl: value })
  }

  return (
    <div>
      <div className='join w-full'>
        <div className='w-full'>
          <label className='input validator join-item w-full h-16'>
            <FontAwesomeIcon
              className='opacity-50 px-2'
              icon={faGoogleDrive}
              size='xl'
            />
            <input
              className='input-xl'
              disabled={disabled}
              onChange={handleInputChange}
              pattern='^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$'
              placeholder='https://'
              required
              title='Must be a valid URL'
              type='url'
              value={value}
            />
          </label>
          <div className='validator-hint hidden'>Must be a valid URL</div>
        </div>
        <button
          className='btn btn-accent join-item h-16 px-8'
          disabled={disabled}
          onClick={handleOpenButtonClick}
        >
          {loading ? (
            <span className='loading loading-infinity loading-xl text-accent'></span>
          ) : (
            'Open'
          )}
        </button>
      </div>
    </div>
  )
}
