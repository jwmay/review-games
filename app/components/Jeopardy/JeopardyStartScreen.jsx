import { useSearchParams } from 'react-router'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import JeopardyFileInput from './JeopardyFileInput'
import { useJeopardyState } from './JeopardyContext'
import { config } from '../../config'

import { JEOPARDY_SET_DATA } from '../../actionTypes'

export default function JeopardyStartScreen() {
  const { dispatch } = useJeopardyState()

  const [searchParams, setSearchParams] = useSearchParams({
    spreadsheetId: '',
  })

  const spreadsheetId = searchParams.get('spreadsheetId')

  function handleDataLoad({ data, spreadsheetId }) {
    dispatch({ type: JEOPARDY_SET_DATA, payload: { data } })

    // Put the spreadsheetId in the url as a search param to make easy sharing of games
    setSearchParams((searchParams) => {
      searchParams.set('spreadsheetId', spreadsheetId)
      return searchParams
    })
  }

  return (
    <div className='bg-jeopardy-blue min-h-screen px-24 py-12 text-center'>
      <h1 className='text-5xl font-bold font-jeopardy-card text-shadow-jeopardy-board uppercase my-8'>
        Get Started
      </h1>
      <div className='border-8 border-jeopardy-gold rounded-box p-12'>
        <h2 className='text-3xl font-jeopardy-card uppercase mb-4'>
          Enter a Google Sheets file url
        </h2>
        <JeopardyFileInput
          initialValue={spreadsheetId}
          onLoad={handleDataLoad}
        />
      </div>
      <h2 className='text-6xl font-jeopardy-card text-shadow-jeopardy-board uppercase my-10 text-jeopardy-gold'>
        or
      </h2>
      <div className='w-2/5 mx-auto'>
        <a href={config.jeopardy.templateUrl} target='_blank'>
          <motion.div
            className='border-8 border-jeopardy-gold rounded-box p-16 cursor-pointer hover:bg-jeopardy-gold hover:text-white'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon className='mb-4' icon={faGoogleDrive} size='4x' />
            <h2 className='text-3xl font-jeopardy-card uppercase'>
              Make a copy of the Google Sheets template file to create a new
              game
            </h2>
          </motion.div>
        </a>
      </div>
    </div>
  )
}
