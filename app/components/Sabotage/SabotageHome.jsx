import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import SabotageGameRow from './SabotageGameRow'

import { useSabotageState } from '../../context/SabotageContext'

export default function SabotageHome() {
  const { state } = useSabotageState()

  function GameRows() {
    return [...Array(state.settings.numGroups)].map((_, index) => (
      <SabotageGameRow
        color={state.settings.colors[index]}
        key={index}
        numBoxes={state.settings.numBoxes}
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
