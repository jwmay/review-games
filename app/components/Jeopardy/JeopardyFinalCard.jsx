import { useEffect, useState } from 'react'
import { AutoTextSize } from 'auto-text-size'
import parse from 'html-react-parser'
import { useAudioPlayer } from 'react-use-audio-player'
import { useJeopardyState } from './JeopardyContext'

const VIEWS = {
  ANSWER: 'ANSWER',
  CATEGORY: 'CATEGORY',
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

  const { state } = useJeopardyState()

  const animateClass = state.settings.studyMode ? '' : 'animate-zoom-in'

  function handleClick() {
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
      default:
        setView(null)
    }
  }

  let display
  switch (view) {
    case VIEWS.TITLE_CARD:
      display = <img className={animateClass} src='images/final-jeopardy.jpg' />
      break
    case VIEWS.CATEGORY:
      display = (
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <h1 className='font-jeopardy-card text-6xl text-jeopardy-gold uppercase'>
            Final Jeopardy!
          </h1>
          <h2 className='font-jeopardy-card mt-2 mb-32 text-4xl uppercase'>
            Category
          </h2>
          <h3
            className={`font-jeopardy-board text-[12rem] uppercase ${animateClass}`}
          >
            {state.data.final.category}
          </h3>
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
    default:
      display = <div className='text-9xl'>GAME OVER</div>
  }

  // Play think music when the question is shown
  useEffect(() => {
    if (view === VIEWS.QUESTION && !isPlaying && !state.settings.studyMode) {
      play()
    } else {
      stop()
    }
  }, [view])

  return (
    <div
      className='jeopardy-card'
      onClick={handleClick}
      style={{
        color: view === VIEWS.ANSWER ? 'var(--color-jeopardy-gold)' : '',
        cursor: !view ? 'default' : 'pointer',
      }}
    >
      {display}
    </div>
  )
}
