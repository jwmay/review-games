import { useEffect, useState } from 'react'
import { AutoTextSize } from 'auto-text-size'
import parse from 'html-react-parser'
import { useAudioPlayer } from 'react-use-audio-player'

import { useJeopardyState } from '../../context/JeopardyContext'
import { JEOPRADY_RESTART_GAME, JEOPARDY_SET_STATUS } from '../../actionTypes'

const VIEWS = {
  ANSWER: 'ANSWER',
  CATEGORY: 'CATEGORY',
  GAME_OVER: 'GAME_OVER',
  QUESTION: 'QUESTION',
  TITLE_CARD: 'TITLE_CARD',
}

export default function JeopardyFinalCard() {
  const [view, setView] = useState(VIEWS.TITLE_CARD)

  const { isPlaying, play, stop } = useAudioPlayer(
    'audio/jeopardy-think-music.mp3',
    {
      autoplay: false,
    }
  )

  const { state, dispatch } = useJeopardyState()

  const animateClass = state.settings.studyMode ? '' : 'animate-zoom-in'

  function handleCardClick() {
    switch (view) {
      case VIEWS.TITLE_CARD:
        setView(VIEWS.CATEGORY)
        break
      case VIEWS.CATEGORY:
        setView(VIEWS.QUESTION)
        break
      case VIEWS.QUESTION:
        setView(VIEWS.ANSWER)
        break
      case VIEWS.ANSWER:
        setView(VIEWS.GAME_OVER)
        break
      default:
        setView(VIEWS.GAME_OVER)
    }
  }

  function handleRestartButtonClick() {
    dispatch({ type: JEOPRADY_RESTART_GAME })
  }

  function handleViewScoreboardButtonClick(e) {
    e.stopPropagation()
    dispatch({
      type: JEOPARDY_SET_STATUS,
      payload: { status: 'isScoring', value: true },
    })
  }

  // Play think music when the question is shown if settings allow
  useEffect(() => {
    if (view === VIEWS.QUESTION && !isPlaying && !state.settings.studyMode) {
      play()
    } else {
      stop()
    }
  }, [view, state.settings.studyMode])

  let display
  switch (view) {
    case VIEWS.TITLE_CARD:
      display = <img className={animateClass} src='images/final-jeopardy.jpg' />
      break
    case VIEWS.CATEGORY:
      display = (
        <div className='flex flex-col h-full w-full justify-start items-center'>
          <h1 className='font-jeopardy-card mt-16 text-6xl text-jeopardy-gold uppercase'>
            Final Jeopardy!
          </h1>
          <h2 className='font-jeopardy-card mt-2 mb-[15%] text-4xl uppercase'>
            Category
          </h2>
          <h3
            className={`font-jeopardy-board text-[12rem] uppercase ${animateClass}`}
          >
            {state.data.final.category}
          </h3>
          {state.settings.showScoreboard && !state.settings.studyMode && (
            <button
              className='btn btn-xl btn-warning mt-8'
              onClick={handleViewScoreboardButtonClick}
            >
              View scoreboard
            </button>
          )}
        </div>
      )
      break
    case VIEWS.QUESTION:
    case VIEWS.ANSWER:
      display = (
        <AutoTextSize as='p' maxFontSizePx={96} minFontSizePx={24} mode='box'>
          {view === VIEWS.QUESTION
            ? parse(state.data.final.question)
            : parse(state.data.final.answer)}
        </AutoTextSize>
      )
      break
    case VIEWS.GAME_OVER:
      display = (
        <div>
          <div className='text-9xl'>GAME OVER</div>
          <div className={`${animateClass} mt-8`}>
            {state.settings.showScoreboard && !state.settings.studyMode && (
              <button
                className='btn btn-xl btn-warning mr-4'
                onClick={handleViewScoreboardButtonClick}
              >
                View scoreboard
              </button>
            )}
            <button
              className='animate-pulse btn btn-xl btn-accent'
              onClick={handleRestartButtonClick}
            >
              Restart
            </button>
          </div>
        </div>
      )
      break
    default:
      display = null
      break
  }

  return (
    <div
      className='jeopardy-card'
      onClick={handleCardClick}
      style={{
        color: view === VIEWS.ANSWER ? 'var(--color-jeopardy-gold)' : '',
        cursor: view === VIEWS.GAME_OVER ? 'default' : 'pointer',
      }}
    >
      {display}
    </div>
  )
}
