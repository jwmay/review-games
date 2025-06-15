import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import ErrorAlert from '../ErrorAlert'

import { config } from '../../config'
import { useGoogleSheetsUrl } from '../../hooks'

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

  function handleClearInputButtonClick() {
    setError(null)
    setIsValid(false)
    setSpreadsheetUrl('')
  }

  async function handlePlayButtonClick() {
    setError(null)
    setIsLoading(true)

    const spreadsheetId = getSpreadsheetId(spreadsheetUrl)
    const sheetName = config.jeopardy.sheet.name
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
        if (
          data.values.length !== config.jeopardy.sheet.dims.rows ||
          data.values[0].length !== config.jeopardy.sheet.dims.cols
        ) {
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

        const final = structuredData.pop() // Final Jeopardy is stored in the last row

        onLoad({ data: { main: structuredData, final }, spreadsheetId })
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.message === '400') {
          setError({
            message: `Cannot find a sheet titled "${config.jeopardy.sheet.name}" in the template file.`,
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
          <label className='input validator join-item w-full h-16 relative'>
            <FontAwesomeIcon
              className='opacity-50 px-2'
              icon={faGoogleDrive}
              size='xl'
            />
            <input
              className='input-xl pr-[64px]'
              disabled={isLoading}
              onChange={handleInputChange}
              pattern='https?://docs.google.com/spreadsheets/d/.+'
              placeholder='https://'
              required
              title='Enter a Google Sheets URL'
              type='url'
              value={spreadsheetUrl}
            />
            <button
              className='btn btn-circle btn-ghost btn-warning absolute right-4'
              disabled={!spreadsheetUrl}
              onClick={handleClearInputButtonClick}
              title='Clear url'
            >
              <FontAwesomeIcon icon={faXmark} size='xl' />
            </button>
          </label>
          <div className='validator-hint hidden'>
            {`Must be a valid Google Sheets URL
            (https://docs.google.com/spreadsheets/d/...)`}
          </div>
        </div>
        <button
          className={`btn btn-accent join-item h-16 px-8 ${
            isLoading || isValid ? 'animate-pulse hover:animate-none' : ''
          }`}
          disabled={isLoading || !isValid}
          onClick={handlePlayButtonClick}
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
