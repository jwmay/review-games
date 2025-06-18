import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Incrementer from '../Incrementer'

import { config } from '../../config'
import { useJeopardyState } from '../../context/JeopardyContext'

import {
  JEOPRADY_RESTART_GAME,
  JEOPARDY_SAVE_SETTINGS,
} from '../../actionTypes'

export default function JeopardyNavbarMenu() {
  const { state, dispatch } = useJeopardyState()

  const isLoaded = state.data.main.length === 0

  function handleIncrementerChange(setting, value) {
    dispatch({ type: JEOPARDY_SAVE_SETTINGS, payload: { setting, value } })
  }

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
            checked={state.settings.studyMode}
            className='toggle toggle-sm toggle-warning'
            onChange={() => handleSettingButtonClick('studyMode')}
            type='checkbox'
          />
          Study mode
          <div
            className='tooltip tooltip-left'
            data-tip='Disables animations and sounds'
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
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
          Amount with question
          <div
            className='tooltip tooltip-left'
            data-tip='Shows the dollar amount when a question is displayed, helpful for manual scoring'
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        </label>
      </li>

      <div className='divider m-0'></div>

      <li className='py-2'>
        <label className='label'>
          <input
            checked={
              state.settings.studyMode ? false : state.settings.showScoreboard
            }
            disabled={state.settings.studyMode}
            className='toggle toggle-sm toggle-warning'
            onChange={() => handleSettingButtonClick('showScoreboard')}
            type='checkbox'
          />
          Scoreboard
        </label>
      </li>

      {state.settings.showScoreboard && !state.settings.studyMode && (
        <li className='py-2'>
          <label className='label'>
            <input
              checked={state.settings.useSoundEffects}
              className='toggle toggle-sm toggle-warning'
              onChange={() => handleSettingButtonClick('useSoundEffects')}
              type='checkbox'
            />
            Sound effects
          </label>
        </li>
      )}

      {state.settings.showScoreboard && !state.settings.studyMode && (
        <li className='py-2'>
          <Incrementer
            description={`Supports ${config.jeopardy.numTeams.min} to ${config.jeopardy.numTeams.max} teams`}
            initialValue={state.settings.numTeams}
            label='Teams'
            max={config.jeopardy.numTeams.max}
            min={config.jeopardy.numTeams.min}
            name='numTemas'
            onChange={(value) => handleIncrementerChange('numTeams', value)}
          />
        </li>
      )}
    </>
  )
}
