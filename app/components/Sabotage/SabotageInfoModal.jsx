import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faChessBoard,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import GameInfoModal from '../GameInfoModal'

export function Entry({ children, color, heading, icon }) {
  return (
    <li className='list-row mb-12 last-of-type:mb-0'>
      <div>
        <FontAwesomeIcon
          className={'text-warning fa-3x'}
          fixedWidth
          icon={icon}
        />
      </div>
      <div>
        <h2 className={`text-${color} text-3xl mb-6`}>{heading}</h2>
        <div className='text-lg pb-4'>{children}</div>
      </div>
    </li>
  )
}

export function Step({ children }) {
  return (
    <li
      className='step step-primary'
      style={{
        gap: 30,
        gridRowStart: 'auto',
        minHeight: '9rem',
        textAlign: 'left',
      }}
    >
      <p className=''>{children}</p>
    </li>
  )
}

export default function SabotageInfoModal() {
  return (
    <GameInfoModal id='sabotage_info_modal' title='Sabotage'>
      <ul className='list'>
        <Entry color='info' heading='Objective' icon={faBullseye}>
          To have the fewest number of boxes by the end of the game.
        </Entry>
        <Entry color='secondary' heading='How to Play' icon={faChessBoard}>
          <ul className='steps steps-vertical'>
            <Step>
              The first team to correctly answer a question gets 6 boxes to
              assign. The scoring team can assign 1 box to 6 teams, 6 boxes to 1
              team, or any combination inbetween.
            </Step>
            <Step>
              Once a scoring team has 3 or more boxes, they can choose to remove
              3 boxes from themselves and add 3 boxes in any combination to
              other teams.
            </Step>
            <Step>
              Once a team's entire row is full, they cannot remove boxes from
              themselves and they cannot win the game. They can, however,
              continue to correctly answer questions and assign boxes to other
              teams.
            </Step>
            <Step>
              You can, of course, make up any set of rules you would like or
              just change the numbers provided here to mix things up!
            </Step>
          </ul>
        </Entry>
        <Entry color='success' heading='How to Win' icon={faTrophy}>
          The team or teams with the fewest boxes is the winner! Teams that have
          their entire row full cannot win the game.
          <div className='flex justify-end mt-16'>
            <button className='btn btn-outline mr-2'>Close</button>
            <Link className='btn btn-accent' to='/sabotage'>
              Play
            </Link>
          </div>
        </Entry>
      </ul>
    </GameInfoModal>
  )
}
