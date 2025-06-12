import { useState } from 'react'
import { AutoTextSize } from 'auto-text-size'
import parse from 'html-react-parser'
import { useContextDispatch, useContextState } from './JeopardyContext'

import { JEOPARDY_SET_SELECTED } from '../../actionTypes'

export default function JeopardyQuestionCard({ item }) {
  const [display, setDisplay] = useState('question')

  const state = useContextState()
  const dispatch = useContextDispatch()

  function handleClick() {
    const newDisplay = display === 'question' ? 'answer' : null
    setDisplay(newDisplay)
    if (!newDisplay) {
      dispatch({ type: JEOPARDY_SET_SELECTED, payload: { selected: null } })
    }
  }

  return (
    <div
      className='jeopardy-card'
      onClick={handleClick}
      style={{
        color: display === 'answer' ? 'var(--color-jeopardy-gold)' : '',
      }}
    >
      <AutoTextSize as='p' maxFontSizePx={96} minFontSizePx={24} mode='box'>
        {display === 'question' ? parse(item.question) : parse(item.answer)}
      </AutoTextSize>
      {state.settings.showAmount && (
        <div className='absolute right-0 bottom-0 m-4 text-6xl'>
          $ {item.amount}
        </div>
      )}
    </div>
  )
}
