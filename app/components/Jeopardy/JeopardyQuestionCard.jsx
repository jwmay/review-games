import { useState } from 'react'
import parse from 'html-react-parser'

export default function JeopardyQuestionCard({ item, onClick }) {
  const [display, setDisplay] = useState('question')

  function handleClick() {
    const newDisplay = display === 'question' ? 'answer' : null
    setDisplay(newDisplay)
    onClick(newDisplay)
  }

  return (
    <div
      className='jeopardy-card h-screen grid place-items-center px-48 py-32 cursor-pointer'
      onClick={handleClick}
      style={{
        color: display === 'answer' ? 'var(--color-jeopardy-gold)' : '',
      }}
    >
      <p className='font-jeopardy-card text-shadow-jeopardy-board text-7xl text-center'>
        {display === 'question' ? parse(item.question) : parse(item.answer)}
      </p>
    </div>
  )
}
