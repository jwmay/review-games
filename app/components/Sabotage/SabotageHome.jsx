import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import GameRow from './GameRow'

import { config } from '../../config'
import { useGenerateRandomColors } from '../../hooks'

export default function SabotageHome() {
  const [searchParams, setSearchParams] = useSearchParams({
    colors: useGenerateRandomColors(config.sabotage.numGroups.max),
    numBoxes: config.sabotage.numBoxes.default,
    numGroups: config.sabotage.numGroups.default,
  })

  const colors = searchParams.getAll('colors')
  const numBoxes = parseInt(searchParams.get('numBoxes'))
  const numGroups = parseInt(searchParams.get('numGroups'))

  function handleColorsChange(colors) {
    setSearchParams((searchParams) => {
      searchParams.delete('colors')
      colors.forEach((color) => searchParams.append('colors', color))
      return searchParams
    })
  }

  function handleNumBoxesChange(numBoxes) {
    setSearchParams((searchParams) => {
      searchParams.set('numBoxes', numBoxes)
      return searchParams
    })
  }

  function handleNumGroupsChange(numGroups) {
    setSearchParams((searchParams) => {
      searchParams.set('numGroups', numGroups)
      return searchParams
    })
  }

  function GameRows() {
    return [...Array(numGroups)].map((_, index) => (
      <GameRow
        color={colors[index]}
        key={index}
        numBoxes={numBoxes}
        title={`Team ${index + 1}`}
      />
    ))
  }

  return (
    <div className='min-h-screen'>
      <Navbar
        allowFullscreen
        menu={
          <SabotageNavbarMenu
            onColorsChange={handleColorsChange}
            onNumBoxesChange={handleNumBoxesChange}
            onNumGroupsChange={handleNumGroupsChange}
          />
        }
        title='Sabotage'
      />
      <div className='flex flex-col items-center gap-8 py-8'>
        <GameRows />
      </div>
    </div>
  )
}
