import Incrementer from '../Incrementer'

import { config } from '../../config'
import { useGenerateRandomColors } from '../../hooks'
import { useSabotageState } from '../../context/SabotageContext'

import {
  SABOTAGE_RESTART_GAME,
  SABOTAGE_SAVE_SETTINGS,
} from '../../actionTypes'

export default function SabotageNavbarMenu() {
  const { dispatch } = useSabotageState()

  function handleColorsChangeButtonClick() {
    const colors = useGenerateRandomColors(config.sabotage.numGroups.max)
    dispatch({
      type: SABOTAGE_SAVE_SETTINGS,
      payload: { setting: 'colors', value: colors },
    })
  }

  function handleIncrementerChange(setting, value) {
    dispatch({ type: SABOTAGE_SAVE_SETTINGS, payload: { setting, value } })
  }

  function handleRestartGameButtonClick() {
    dispatch({ type: SABOTAGE_RESTART_GAME })
  }

  return (
    <>
      <li className='py-2'>
        <button onClick={handleRestartGameButtonClick}>Restart game</button>
      </li>
      <li className='py-2'>
        <button onClick={handleColorsChangeButtonClick}>Change Colors</button>
      </li>
      <div className='divider m-0'></div>
      <li className='py-2'>
        <Incrementer
          description={`Supports ${config.sabotage.numBoxes.min} to ${config.sabotage.numBoxes.max} boxes`}
          initialValue={config.sabotage.numBoxes.default}
          label='Boxes'
          max={config.sabotage.numBoxes.max}
          min={config.sabotage.numBoxes.min}
          name='numBoxes'
          onChange={(value) => handleIncrementerChange('numBoxes', value)}
        />
      </li>
      <li className='py-2'>
        <Incrementer
          description={`Supports ${config.sabotage.numGroups.min} to ${config.sabotage.numGroups.max} groups`}
          initialValue={config.sabotage.numGroups.default}
          label='Groups'
          max={config.sabotage.numGroups.max}
          min={config.sabotage.numGroups.min}
          name='numGroups'
          onChange={(value) => handleIncrementerChange('numGroups', value)}
        />
      </li>
    </>
  )
}
