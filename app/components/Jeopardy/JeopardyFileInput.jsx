import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import ErrorAlert from '../ErrorAlert'
import { useGoogleSheetsUrl } from '../../hooks'
import { config } from '../../config'

function getSpreadsheetId(url) {
  const regex = /\/d\/(.+)\//
  const match = url.match(regex)
  const id = match ? match[1] : ''
  return id
}

export default function JeopardyFileInput({ initialValue, onLoad }) {
  const url = useGoogleSheetsUrl(initialValue)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(!initialValue ? false : true)
  const [spreadsheetUrl, setSpreadsheetUrl] = useState(url)

  function handleInputChange(event) {
    setError(null)

    const url = event.target.value
    setSpreadsheetUrl(url)

    // Validation check and flag for button activation with a valid entry
    const regex = /https?\:\/\/docs\.google\.com\/spreadsheets\/d\/.+/
    const match = url.match(regex)
    match ? setIsValid(true) : setIsValid(false)
  }

  async function handleButtonClick() {
    setError(null)
    setIsLoading(true)

    const spreadsheetId = getSpreadsheetId(spreadsheetUrl)
    const sheetName = config.jeopardy.sheetName
    const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY

    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`

    await fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then((data) => {
        // Validate the shape of the data file
        if (data.values.length !== 31 || data.values[0].length !== 4) {
          throw new Error('499')
        }

        const structuredData = data.values
          .map((value, index, arr) => {
            const keys = arr[0]

            // Skip row with header values
            if (index === 0) return null

            return value.reduce(
              (accumulator, currentValue, index) => {
                accumulator[keys[index]] = currentValue
                return accumulator
              },
              { clicked: false, id: index }
            )
          })
          .filter((el) => el !== null)

        onLoad({ data: structuredData, spreadsheetId })
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.message === '400') {
          setError({
            message: `Cannot find a sheet titled "${config.jeopardy.sheetName}" in the template file.`,
            status: 400,
          })
        } else if (error.message === '403') {
          setError({
            message:
              'Incorrect file permissions. File must be shared so that anyone with the link can view the file.',
            status: 403,
          })
        } else if (error.message === '404') {
          setError({
            message:
              'File not found. Please provide a valid Google Sheets file url.',
            status: 404,
          })
        } else if (error.message === '429') {
          setError({
            message: 'Request limit exceeded. Wait 1 minute and try again.',
            status: 429,
          })
        } else if (error.message === '499') {
          setError({
            message: 'Data in the template file is missing or malformed.',
            status: 499,
          })
        } else {
          setError({
            message: `An unknown error occured. Please try again. (${error.message})`,
            status: 0,
          })
        }
        setIsLoading(false)
      })
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
              disabled={isLoading}
              onChange={handleInputChange}
              pattern='https?://docs.google.com/spreadsheets/d/.+'
              placeholder='https://'
              required
              title='Enter a Google Sheets URL'
              type='url'
              value={spreadsheetUrl}
            />
          </label>
          <div className='validator-hint hidden'>
            {`Must be a valid Google Sheets URL
            (https://docs.google.com/spreadsheets/d/...)`}
          </div>
        </div>
        <button
          className='btn btn-accent join-item h-16 px-8'
          disabled={isLoading || !isValid}
          onClick={handleButtonClick}
        >
          {isLoading ? (
            <span className='loading loading-infinity loading-xl text-accent'></span>
          ) : (
            <>
              <FontAwesomeIcon size='xl' icon={faPlay} /> Play
            </>
          )}
        </button>
      </div>
      {error && (
        <ErrorAlert className='mt-6'>{`[Error ${error.status}] ${error.message}`}</ErrorAlert>
      )}
    </div>
  )
}
