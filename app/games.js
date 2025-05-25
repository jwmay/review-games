import jeoparyLogo from './images/game-tile-jeopardy.jpg'
import sabotageLogo from './images/game-tile-sabotage.jpg'
import sailingLogo from './images/game-tile-sailing.jpg'

export default [
  {
    title: 'Jeopardy',
    description: 'The classic trivia game!',
    imageSrc: jeoparyLogo,
    comingSoon: true,
  },
  {
    title: 'Sabotage',
    description: 'Knock out teams but risk getting eliminated yourself!',
    imageSrc: sabotageLogo,
    comingSoon: false,
  },
  {
    title: 'Sailing',
    description: 'Race your way to the finish line!',
    imageSrc: sailingLogo,
    comingSoon: true,
  },
]
