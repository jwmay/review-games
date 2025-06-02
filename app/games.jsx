import SabotageInfoModal from './components/Sabotage/SabotageInfoModal'

export default [
  {
    title: 'Jeopardy',
    description: 'The classic trivia game!',
    imageSrc: 'images/game-tile-jeopardy.jpg',
    learnMoreModal: null,
    comingSoon: true,
  },
  {
    title: 'Sabotage',
    description: 'Knock out teams but risk getting eliminated yourself!',
    imageSrc: 'images/game-tile-sabotage.jpg',
    learnMoreModal: <SabotageInfoModal />,
    comingSoon: false,
  },
  {
    title: 'Sailing',
    description: 'Race your way to the finish line!',
    imageSrc: 'images/game-tile-sailing.jpg',
    learnMoreModal: null,
    comingSoon: true,
  },
]
