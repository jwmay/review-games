import Navbar from '../components/Nav/Navbar'
import GameRow from '../components/Sabotage/GameRow'

export const meta = () => {
  // @todo: how to update this dynamically? don't want this on every route
  return [{ title: 'Sabotage | Review Games' }]
}

export default function Sabotage() {
  const numGroups = 10

  const gameRows = [...Array(numGroups)].map((_, index) => (
    <GameRow key={index} title={`Team ${index + 1}`} />
  ))

  return (
    <div className='h-screen'>
      <Navbar title='Sabotage' />
      <div className='game-board flex flex-col items-center gap-8'>
        {gameRows}
      </div>
    </div>
  )
}
