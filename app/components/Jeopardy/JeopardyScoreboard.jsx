import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faChevronRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
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
      <div className='grid grid-cols-[repeat(5,calc(80vh/3))] grid-rows-[8vh_repeat(2,40vh)] gap-x-8 gap-y-[2vh] h-full items-center justify-center p-[4vh]'>
        <h1 className='col-span-5 font-jeopardy-card justify-self-center text-[8vh] text-jeopardy-gold uppercase'>
          Scoreboard
        </h1>
        {state.status.scores.map((score, index) => {
          if (index >= state.settings.numTeams) return null

          return (
            <div
              className='bg-contain bg-no-repeat bg-center h-full'
              key={index}
              style={{ backgroundImage: 'url("images/jeopardy-podium.png")' }}
            >
              {/* Grid sizing is based on dimensions of the podium image used in the background */}
              <div className='grid grid-cols-[20.25%_59.50%_20.25%] grid-rows-[9.00%_13.00%_11.00%_22.45%_2.10%_19.50%_22.95%] h-full place-items-center w-full'>
                <div className='flex' style={{ gridArea: '2 / 2 / 3 / 3' }}>
                  <NumericFormat
                    displayType='text'
                    prefix='$ '
                    renderText={(value) => (
                      <span className='font-jeopardy-board text-[5vh] text-shadow-jeopardy-board'>
                        {value}
                      </span>
                    )}
                    thousandSeparator=','
                    value={score}
                  />
                </div>
                <span
                  className='font-jeopardy-handwriting text-[4.5vh]'
                  style={{ gridArea: '4 / 2 / 5 / 2' }}
                >
                  Team {index + 1}
                </span>
                <div className='join' style={{ gridArea: '6 / 2 / 7 / 3' }}>
                  <button
                    className='btn btn-error btn-soft btn-sm md:btn-md lg:btn-lg xl:btn-xl join-item'
                    onClick={() => {
                      handleSetScoreClick(index, true)
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} size='lg' />
                  </button>
                  <button
                    className='btn btn-success btn-soft btn-sm md:btn-md lg:btn-lg xl:btn-xl join-item'
                    onClick={() => {
                      handleSetScoreClick(index)
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} size='lg' />
                  </button>
                </div>
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
