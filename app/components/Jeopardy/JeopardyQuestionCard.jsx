import { useState } from 'react'
import { AutoTextSize } from 'auto-text-size'
import parse from 'html-react-parser'
import { useJeopardyState } from '../../context/JeopardyContext'

import { JEOPARDY_SET_GAME_STATUS } from '../../actionTypes'

const VIEWS = {
  ANSWER: 'ANSWER',
  QUESTION: 'QUESTION',
}

export default function JeopardyQuestionCard({ item }) {
  const [view, setView] = useState(VIEWS.QUESTION)

  const { state, dispatch } = useJeopardyState()

  const isScoring = state.settings.showScoreboard && !state.settings.studyMode

  function handleClick() {
    switch (view) {
      case VIEWS.QUESTION:
        setView(VIEWS.ANSWER)
        break
      case VIEWS.ANSWER:
        dispatch({
          type: JEOPARDY_SET_GAME_STATUS,
          payload: {
            status: 'isScoring',
            value: isScoring,
          },
        })
        dispatch({
          type: JEOPARDY_SET_GAME_STATUS,
          payload: {
            status: 'selected',
            value: isScoring ? state.status.selected : null,
          },
        })
    }
  }

  return (
    <div
      className='jeopardy-card'
      onClick={handleClick}
      style={{
        color: view === VIEWS.ANSWER ? 'var(--color-jeopardy-gold)' : '',
      }}
    >
      <AutoTextSize as='p' maxFontSizePx={96} minFontSizePx={24} mode='box'>
        {view === VIEWS.QUESTION ? parse(item.question) : parse(item.answer)}
      </AutoTextSize>
      {state.settings.showAmount && (
        <div className='absolute right-0 bottom-0 m-4 text-6xl'>
          $ {item.amount}
        </div>
      )}
    </div>
  )
}
