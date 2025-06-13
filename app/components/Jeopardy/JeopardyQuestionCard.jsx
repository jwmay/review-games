import { useState } from 'react'
import { AutoTextSize } from 'auto-text-size'
import parse from 'html-react-parser'
import { useContextDispatch, useContextState } from './JeopardyContext'

import { JEOPARDY_SET_SELECTED } from '../../actionTypes'

const VIEWS = {
  ANSWER: 'ANSWER',
  QUESTION: 'QUESTION',
}

export default function JeopardyQuestionCard({ item }) {
  const [view, setView] = useState(VIEWS.QUESTION)

  const state = useContextState()
  const dispatch = useContextDispatch()

  function handleClick() {
    const newView = view === VIEWS.QUESTION ? VIEWS.ANSWER : null
    setView(newView)
    if (!newView) {
      dispatch({ type: JEOPARDY_SET_SELECTED, payload: { selected: null } })
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
