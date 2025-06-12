import { useContextState, useContextDispatch } from './JeopardyContext'
import {
  JEOPRADY_LOAD_NEW_SPREADSHEET,
  JEOPRADY_RESET_GAME_BOARD,
  JEOPARDY_SAVE_SETTINGS,
} from '../../actionTypes'

export default function JeopardyNavbarMenu() {
  const state = useContextState()
  const dispatch = useContextDispatch()

  const isLoaded = state.data.main.length === 0

  function handleLoadNewSpreadsheetButtonClick() {
    dispatch({ type: JEOPRADY_LOAD_NEW_SPREADSHEET })
  }

  function handleResetBoardButtonClick() {
    dispatch({ type: JEOPRADY_RESET_GAME_BOARD })
  }

  function handleSettingButtonClick(setting) {
    const value = !state.settings[setting]
    dispatch({ type: JEOPARDY_SAVE_SETTINGS, payload: { setting, value } })
  }

  return (
    <>
      <li className={`py-2 ${isLoaded ? 'menu-disabled' : ''}`}>
        <button onClick={handleResetBoardButtonClick}>Reset game board</button>
      </li>
      <li className={`py-2 ${isLoaded ? 'menu-disabled' : ''}`}>
        <button onClick={handleLoadNewSpreadsheetButtonClick}>
          Load new spreadsheet
        </button>
      </li>
      <div className='divider m-0'></div>
      <li className='py-2'>
        <label className='label'>
          <input
            checked={state.settings.showIntro}
            className='toggle toggle-sm toggle-warning'
            onChange={() => handleSettingButtonClick('showIntro')}
            type='checkbox'
          />
          Show intro when game starts
        </label>
      </li>
      <li className='py-2'>
        <label className='label'>
          <input
            checked={state.settings.showAmount}
            className='toggle toggle-sm toggle-warning'
            onChange={() => handleSettingButtonClick('showAmount')}
            type='checkbox'
          />
          Show amount with question
        </label>
      </li>
    </>
  )
}
