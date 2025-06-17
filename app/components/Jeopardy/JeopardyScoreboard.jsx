import { useJeopardyState } from '../../context/JeopardyContext'

import { JEOPARDY_SET_GAME_STATUS } from '../../actionTypes'

export default function JeopardyScoreboard() {
  const { dispatch } = useJeopardyState()

  function handleButtonClick() {
    dispatch({
      type: JEOPARDY_SET_GAME_STATUS,
      payload: { status: 'isScoring', value: false },
    })
  }

  return (
    <div>
      <h1>Jeopardy Scoreboard</h1>
      <button className='btn btn-warning btn-xl' onClick={handleButtonClick}>
        Continue
      </button>
    </div>
  )
}
