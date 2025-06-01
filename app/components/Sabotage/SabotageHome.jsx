import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import GameRow from './GameRow'
import { config } from '../../config'

export default function SabotageHome() {
  const [searchParams, setSearchParams] = useSearchParams({
    colors: config.sabotage.colors,
    numGroups:
      config.sabotage.numGroups.current || config.sabotage.numGroups.default,
  })

  const colors = searchParams.getAll('colors')

  const numGroups = parseInt(searchParams.get('numGroups'))

  function handleColorsChange(colors) {
    setSearchParams((searchParams) => {
      searchParams.delete('colors')
      colors.forEach((color) => searchParams.append('colors', color))
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
      <GameRow color={colors[index]} key={index} title={`Team ${index + 1}`} />
    ))
  }

  return (
    <div className='min-h-screen pb-16'>
      <Navbar
        menu={
          <SabotageNavbarMenu
            onColorsChange={handleColorsChange}
            onNumGroupsChange={handleNumGroupsChange}
          />
        }
        title='Sabotage'
      />
      <div className='flex flex-col items-center gap-8'>
        <GameRows />
      </div>
    </div>
  )
}
