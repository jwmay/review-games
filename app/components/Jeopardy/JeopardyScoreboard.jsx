import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { AutoTextSize } from 'auto-text-size'
import { NumericFormat } from 'react-number-format'
import { useJeopardyState } from '../../context/JeopardyContext'

import { JEOPARDY_SET_SCORE, JEOPARDY_SET_STATUS } from '../../actionTypes'

const AUDIO = {
  FAILURE: 'audio/fail-sound.mp3',
  SUCCESS: 'audio/success-sound.mp3',
}

export default function JeopardyScoreboard() {
  const { state, dispatch } = useJeopardyState()

  function handleContinueButtonClick() {
    dispatch({
      type: JEOPARDY_SET_STATUS,
      payload: { status: 'isScoring', value: false },
    })
    dispatch({
      type: JEOPARDY_SET_STATUS,
      payload: { status: 'selected', value: null },
    })
  }

  function handleSetScoreClick(id, negative) {
    if (state.settings.useSoundEffects) {
      const audio = new Audio(negative ? AUDIO.FAILURE : AUDIO.SUCCESS)
      audio.play()
    }

    const score = negative
      ? `-${state.status.selected.amount}`
      : state.status.selected.amount

    dispatch({
      type: JEOPARDY_SET_SCORE,
      payload: { id, score },
    })
  }

  return (
    <div className='bg-jeopardy-blue h-screen'>
      <div className='grid grid-cols-5 grid-rows-[8vh_repeat(2,40vh)] gap-x-4 gap-y-[2vh] h-full items-center p-[4vh]'>
        <h1 className='col-span-5 font-jeopardy-card justify-self-center text-[8vh] text-jeopardy-gold uppercase'>
          Scoreboard
        </h1>
        {state.status.scores.map((score, index) => {
          if (index >= state.settings.numTeams) return null

          return (
            <div
              className='bg-contain bg-no-repeat bg-center h-full relative'
              key={index}
              style={{ backgroundImage: 'url("images/jeopardy-podium.png")' }}
            >
              <NumericFormat
                displayType='text'
                prefix='$ '
                thousandSeparator=','
                value={score}
                renderText={(value) => (
                  <span className='absolute left-[50%] -translate-x-1/2 top-[10%] font-jeopardy-board text-4xl text-shadow-jeopardy-board'>
                    {value}
                  </span>
                )}
              />
              <span className='absolute left-[50%] -translate-x-1/2 top-[40%] font-jeopardy-handwriting text-4xl'>
                Team {index + 1}
              </span>
              <div className='absolute join left-[50%] -translate-x-1/2 top-[60%]'>
                <button
                  className='btn btn-error btn-soft btn-xl join-item'
                  onClick={() => {
                    handleSetScoreClick(index, true)
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} size='lg' />
                </button>
                <button
                  className='btn btn-success btn-soft btn-xl join-item'
                  onClick={() => {
                    handleSetScoreClick(index)
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} size='lg' />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className='absolute right-0 bottom-0 m-8 text-6xl'>
        <button
          className='animate-pulse btn btn-warning btn-xl'
          onClick={handleContinueButtonClick}
        >
          Continue <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}
