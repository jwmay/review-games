import { useState } from 'react'
import parse from 'html-react-parser'

import { AutoTextSize } from 'auto-text-size'

export default function JeopardyQuestionCard({ item, onClick }) {
  const [display, setDisplay] = useState('question')

  function handleClick() {
    const newDisplay = display === 'question' ? 'answer' : null
    setDisplay(newDisplay)
    onClick(newDisplay)
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
    </div>
  )
}
