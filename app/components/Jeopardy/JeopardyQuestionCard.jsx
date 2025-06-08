import { useState } from 'react'

export default function JeopardyQuestionCard({ item, onClick }) {
  const [display, setDisplay] = useState('question')

  function handleClick() {
    const newDisplay = display === 'question' ? 'answer' : null
    setDisplay(newDisplay)
    onClick(newDisplay)
  }

  return (
    <div
      className='h-screen grid place-items-center font-jeopardy-card text-shadow-jeopardy-board text-7xl text-center px-48 py-32 cursor-pointer'
      onClick={handleClick}
      style={{
        color: display === 'answer' ? 'var(--color-jeopardy-gold)' : '',
      }}
    >
      {display === 'question' ? item.question : item.answer}
    </div>
  )
}
