import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import JeopardyBoard from './JeopardyBoard'
import JeopardyIntro from './JeopardyIntro'
import JeopardyNavbarMenu from './JeopardyNavbarMenu'
import JeopardyQuestionCard from './JeopardyQuestionCard'
import JeopardyStartScreen from './JeopardyStartScreen'

import { useContextState, useContextDispatch } from './JeopardyContext'
import {
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_DATA,
  JEOPARDY_SET_GAME_STATUS,
  JEOPARDY_SET_SELECTED,
  JEOPARDY_SET_SPREADSHEET_ID,
} from '../../actionTypes'

export default function JeopardyHome() {
  const state = useContextState()
  const dispatch = useContextDispatch()

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
    if (!item.clicked) {
      dispatch({
        type: JEOPARDY_SET_GAME_STATUS,
        payload: { status: 'numClicked', value: state.status.numClicked + 1 },
      })
    }
  }

  function handleSpreadsheetIdChange({ data, spreadsheetId }) {
    setSearchParams((searchParams) => {
      searchParams.set('spreadsheetId', spreadsheetId)
      return searchParams
    })
    dispatch({ type: JEOPARDY_SET_DATA, payload: { data } })
    dispatch({ type: JEOPARDY_SET_SPREADSHEET_ID, payload: { spreadsheetId } })
  }

  let display
  if (state.data.main.length === 0) {
    // no data, display start screen with url input
    display = (
      <JeopardyStartScreen
        onLoad={handleSpreadsheetIdChange}
        spreadsheetId={spreadsheetId}
      />
    )
  } else if (!state.status.isIntroDone && state.settings.showIntro) {
    // show intro animations and music if user settings allow it
    display = <JeopardyIntro />
  } else if (!state.selected) {
    // data but no question selected, display full board
    display = (
      <JeopardyBoard data={state.data.main} onClick={handleQuestionTileClick} />
    )
  } else {
    // data and question selected, show question then answer
    display = (
      <JeopardyQuestionCard
        item={state.selected}
        onClick={handleQuestionCardClick}
      />
    )
  }

  return (
    <div>
      <Navbar allowFullscreen menu={<JeopardyNavbarMenu />} title='Jeopardy' />
      {display}
    </div>
  )
}
