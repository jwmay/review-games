import { useEffect } from 'react'

import { useJeopardyState } from '../../context/JeopardyContext'
import { JEOPARDY_SET_STATUS } from '../../actionTypes'

export default function JeopardyIntro() {
  const { dispatch } = useJeopardyState()

  // Set game status 'isIntroDone' after animations are complete
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: JEOPARDY_SET_STATUS,
        payload: { status: 'isIntroDone', value: true },
      })
    }, 7000) // 7 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className='h-screen w-screen animate-background-fade-in-blue-fade-out'>
      <div className='text-white flex flex-col justify-center items-center h-full w-full text-9xl font-jeopardy-board font-bold uppercase'>
        <h1 className='animate-in-from-top animate-in-from-top-first'>This</h1>
        <h1 className='animate-in-from-top animate-in-from-top-second'>Is</h1>
        <img
          className='animate-in-from-top animate-in-from-top-third'
          src='images/game-tile-jeopardy.jpg'
        />
      </div>
    </main>
  )
}
