import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import SabotageGameRow from './SabotageGameRow'

import { useSabotageState } from '../../context/SabotageContext'

import { SABOTAGE_SET_SCORE } from '../../actionTypes'

export default function SabotageHome() {
  const { state, dispatch } = useSabotageState()

  function handleRowScoreChange(id, score) {
    dispatch({ type: SABOTAGE_SET_SCORE, payload: { id, score } })
  }

  function GameRows() {
    return [...Array(state.settings.numGroups)].map((_, index) => (
      <SabotageGameRow
        color={state.settings.colors[index]}
        initialValue={state.scores[index]}
        key={index}
        numBoxes={state.settings.numBoxes}
        onChange={(score) => handleRowScoreChange(index, score)}
        title={`Team ${index + 1}`}
      />
    ))
  }

  return (
    <div className='min-h-screen'>
      <Navbar allowFullscreen menu={<SabotageNavbarMenu />} title='Sabotage' />
      <div className='flex flex-col items-center gap-8 py-8'>
        <GameRows />
      </div>
    </div>
  )
}
