import { Link } from 'react-router'
import {
  faBullseye,
  faChessBoard,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import { Entry, GameInfoModal, Step } from '../GameInfoModal'

export default function JeopardyInfoModal() {
  return (
    <GameInfoModal id='jeopardy_info_modal' title='Jeopardy'>
      <ul className='list'>
        <Entry color='info' faIcon={faBullseye} title='Objective'>
          To have the most points by the end of the game.
        </Entry>
        <Entry color='secondary' faIcon={faChessBoard} title='How to Play'>
          <ul className='steps steps-vertical'>
            <Step>
              The first team to buzz in gets to answer the question. If they
              answer correctly, they get the points assigned to that question
              and they get to pick the next question. If they answer
              incorrectly, they lose the points assigned to that question and
              another team can buzz in to answer the question.
            </Step>
            <Step>
              The game continues until all questions on the board have been
              answered, at which point, the Final Jeopary round begins.
            </Step>
            <Step>
              For the Final Jeopardy round, teams wager their points up to the
              total they have accummulated. Each team must answer the question
              on paper or a whiteboard before the music ends.
            </Step>
            <Step>
              If their answer is correct, they earn points equal to their wager.
              If they get the question wrong, they lose points equal to their
              wager. There is no race against other teams to answer they
              qeustion, only against the clock.
            </Step>
          </ul>
        </Entry>
        <Entry color='success' faIcon={faTrophy} title='How to Win'>
          The team or teams with the highest number of points (dollars) wins the
          game!
          <div className='flex justify-end mt-16'>
            <button className='btn btn-outline mr-2'>Close</button>
            <Link className='btn btn-accent' to='/jeopardy'>
              Play
            </Link>
          </div>
        </Entry>
      </ul>
    </GameInfoModal>
  )
}
