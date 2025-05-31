import { useSearchParams } from 'react-router'
import Navbar from '../Navbar'
import SabotageNavbarMenu from './SabotageNavbarMenu'
import SabotageProvider from './SabotageProvider'
import GameRow from './GameRow'

import { useGenerateRandomColors } from '../../hooks'

import { config } from '../../config'

export default function SabotageHome() {
  const [searchParams, setSearchParams] = useSearchParams()
  const numGroups =
    parseInt(searchParams.get('numGroups')) || config.sabotage.numGroups.default

  const handleColorsClick = () => {
    setSearchParams((params) => ({
      ...params,
      colors: useGenerateRandomColors(numGroups),
    }))
  }
  const colors = searchParams.getAll('colors')

  const gameRows = [...Array(numGroups)].map((_, index) => (
    <GameRow key={index} title={`Team ${index + 1}`} />
  ))

  return (
    <SabotageProvider>
      <div className='min-h-screen'>
        <Navbar menu={<SabotageNavbarMenu />} title='Sabotage' />
        <div className='flex flex-col items-center gap-8'>
          <p>
            <span className='cursor-pointer' onClick={handleColorsClick}>
              colors:
            </span>{' '}
            {colors.map((color) => `${color}, `)}
          </p>
          {gameRows}
        </div>
      </div>
    </SabotageProvider>
  )
}
