import { useState, useDispatch } from './JeopardyContext'
import {
  JEOPRADY_LOAD_NEW_SPREADSHEET,
  JEOPRADY_RESET_GAME_BOARD,
} from '../../actionTypes'

export default function JeopardyNavbarMenu({}) {
  // const state = useState()
  const dispatch = useDispatch()

  function handleLoadNewSpreadsheetButtonClick() {
    dispatch({ type: JEOPRADY_LOAD_NEW_SPREADSHEET })
  }

  function handleResetBoardButtonClick() {
    dispatch({ type: JEOPRADY_RESET_GAME_BOARD })
  }

  return (
    <>
      <li className='py-2'>
        <button onClick={handleResetBoardButtonClick}>Reset game board</button>
      </li>
      <li className='py-2'>
        <button onClick={handleLoadNewSpreadsheetButtonClick}>
          Load new spreadsheet
        </button>
      </li>
    </>
  )
}
