import { motion } from 'motion/react'
import { AutoTextSize } from 'auto-text-size'
import { useContextState, useContextDispatch } from './JeopardyContext'

import {
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_GAME_STATUS,
  JEOPARDY_SET_SELECTED,
} from '../../actionTypes'

export default function JeopardyQuestionTile({ item }) {
  const state = useContextState()
  const dispatch = useContextDispatch()

  function handleClick() {
    dispatch({ type: JEOPARDY_SET_CLICKED, payload: { id: item.id } })
    dispatch({ type: JEOPARDY_SET_SELECTED, payload: { selected: item } })
    if (!item.clicked) {
      dispatch({
        type: JEOPARDY_SET_GAME_STATUS,
        payload: { status: 'numClicked', value: state.status.numClicked + 1 },
      })
    }
  }

  return (
    <motion.div
      className='jeopardy-board-tile text-jeopardy-gold'
      onClick={handleClick}
      style={{ cursor: item.clicked ? 'not-allowed' : 'pointer' }}
      whileHover={item.clicked ? {} : { scale: 1.1 }}
      whileTap={item.clicked ? {} : { scale: 0.95 }}
    >
      {!item.clicked && (
        <AutoTextSize as='h2' maxFontSizePx={500} mode='box'>
          $ {item.amount}
        </AutoTextSize>
      )}
    </motion.div>
  )
}
