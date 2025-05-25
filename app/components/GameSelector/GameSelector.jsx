import GameTile from './GameTile'
import games from '../../games'

export function GameSelector() {
  return (
    <nav className='flex gap-8'>
      {games.map((game) => (
        <GameTile
          comingSoon={game.comingSoon}
          description={game.description}
          imageSrc={game.imageSrc}
          key={game.title}
          title={game.title}
        />
      ))}
    </nav>
  )
}
