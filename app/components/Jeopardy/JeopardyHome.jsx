import { useSearchParams } from 'react-router'
import ErrorAlert from '../ErrorAlert'
import JeopardyFileInput from './JeopardyFileInput'
import Navbar from '../Navbar'
import { useGoogleSheetsReader } from '../../hooks'

export default function JeopardyHome() {
  const [searchParams, setSearchParams] = useSearchParams({
    sheetId: '',
    sheetUrl: '',
  })

  const sheetId = searchParams.get('sheetId')
  const sheetUrl = searchParams.get('sheetUrl')

  const { data, loading, error } = useGoogleSheetsReader(sheetId)

  function handleSheetUrlChange({ sheetId, sheetUrl }) {
    setSearchParams((searchParams) => {
      searchParams.set('sheetId', sheetId)
      searchParams.set('sheetUrl', sheetUrl)
      return searchParams
    })
  }

  return (
    <div className='min-h-screen bg-jeopardy-dark-blue'>
      <Navbar title='Jeopardy' />
      <div className='w-4/5 mx-auto'>
        <h1 className='text-5xl text-center my-8 font-bold uppercase'>
          Get Started
        </h1>
        <JeopardyFileInput
          disabled={loading}
          initialValue={sheetUrl}
          loading={loading}
          onChange={handleSheetUrlChange}
        />
        {error && <ErrorAlert className='mt-6'>{error.message}</ErrorAlert>}
        {data && <pre>{JSON.stringify(data[1], null, 2)}</pre>}
      </div>
    </div>
  )
}
