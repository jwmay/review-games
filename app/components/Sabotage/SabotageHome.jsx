import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import SabotageProvider from './SabotageProvider'
import GameRow from './GameRow'
import { config } from '../../config'

export default function SabotageHome() {
  const [searchParams] = useSearchParams()

  const colors =
    searchParams.getAll('colors').length > 0
      ? searchParams.getAll('colors')
      : config.sabotage.colors

  const numGroups =
    parseInt(searchParams.get('numGroups')) || config.sabotage.numGroups.default

  function GameRows() {
    return [...Array(numGroups)].map((_, index) => (
      <GameRow color={colors[index]} key={index} title={`Team ${index + 1}`} />
    ))
  }

  return (
    <SabotageProvider>
      <div className='min-h-screen pb-16'>
        <Navbar menu={<SabotageNavbarMenu />} title='Sabotage' />
        <div className='flex flex-col items-center gap-8'>
          <GameRows />
        </div>
      </div>
    </SabotageProvider>
  )
}
