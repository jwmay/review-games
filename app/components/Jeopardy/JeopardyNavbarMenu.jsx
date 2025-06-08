import { useState, useDispatch } from './JeopardyContext'
import { JEOPRADY_RESET_GAME_BOARD } from '../../actionTypes'

export default function JeopardyNavbarMenu({}) {
  // const state = useState()
  const dispatch = useDispatch()

  function handleResetBoardButtonClick() {
    dispatch({ type: JEOPRADY_RESET_GAME_BOARD })
  }

  return (
    <>
      <li className='py-2'>
        <button onClick={handleResetBoardButtonClick}>Reset game board</button>
      </li>
    </>
  )
}
