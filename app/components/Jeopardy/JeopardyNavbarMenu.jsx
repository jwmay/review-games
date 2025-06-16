import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useJeopardyState } from './JeopardyContext'

import {
  JEOPRADY_RESTART_GAME,
  JEOPARDY_SAVE_SETTINGS,
} from '../../actionTypes'

export default function JeopardyNavbarMenu() {
  const { state, dispatch } = useJeopardyState()

  const isLoaded = state.data.main.length === 0

  function handleRestartButtonClick() {
    dispatch({ type: JEOPRADY_RESTART_GAME })
  }

  function handleSettingButtonClick(setting) {
    const value = !state.settings[setting]
    dispatch({ type: JEOPARDY_SAVE_SETTINGS, payload: { setting, value } })
  }

  return (
    <>
      <li className={`py-2 ${isLoaded ? 'menu-disabled' : ''}`}>
        <button onClick={handleRestartButtonClick}>Restart game</button>
      </li>
      <div className='divider m-0'></div>
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
      <li className='py-2'>
        <label className='label'>
          <input
            checked={state.settings.studyMode}
            className='toggle toggle-sm toggle-warning'
            onChange={() => handleSettingButtonClick('studyMode')}
            type='checkbox'
          />
          Study mode
          <div className='tooltip' data-tip='Disables animations and sounds'>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        </label>
      </li>
    </>
  )
}
