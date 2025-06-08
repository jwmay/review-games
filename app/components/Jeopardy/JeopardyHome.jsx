import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import JeopardyStartScreen from './JeopardyStartScreen'
import JeopardyQuestionCard from './JeopardyQuestionCard'
import JeopardyBoard from './JeopardyBoard'

import { useStateValue, useDispatchValue } from './JeopardyContext'
import {
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_DATA,
  JEOPARDY_SET_SELECTED,
  JEOPARDY_SET_SPREADSHEET_ID,
} from '../../actionTypes'

export default function JeopardyHome() {
  const state = useStateValue()
  const dispatch = useDispatchValue()

  const [searchParams, setSearchParams] = useSearchParams({
    spreadsheetId: '',
  })

  const spreadsheetId = searchParams.get('spreadsheetId')

  function handleQuestionCardClick(display) {
    if (!display) {
      dispatch({ type: JEOPARDY_SET_SELECTED, payload: { selected: null } })
    }
  }

  function handleQuestionTileClick(item) {
    dispatch({ type: JEOPARDY_SET_CLICKED, payload: { id: item.id } })
    dispatch({ type: JEOPARDY_SET_SELECTED, payload: { selected: item } })
  }

  function handleSpreadsheetIdChange({ data, spreadsheetId }) {
    setSearchParams((searchParams) => {
      searchParams.set('spreadsheetId', spreadsheetId)
      return searchParams
    })
    dispatch({ type: JEOPARDY_SET_DATA, payload: { data } })
    dispatch({ type: JEOPARDY_SET_SPREADSHEET_ID, payload: { spreadsheetId } })
  }

  return (
    <div className='min-h-screen bg-jeopardy-blue'>
      <Navbar title='Jeopardy' />
      {state.data.length === 0 ? (
        <JeopardyStartScreen
          onLoad={handleSpreadsheetIdChange}
          spreadsheetId={spreadsheetId}
        />
      ) : !state.selected ? (
        <JeopardyBoard data={state.data} onClick={handleQuestionTileClick} />
      ) : (
        <JeopardyQuestionCard
          item={state.selected}
          onClick={handleQuestionCardClick}
        />
      )}
    </div>
  )
}
