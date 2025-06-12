import { motion } from 'motion/react'
import { AutoTextSize } from 'auto-text-size'

export default function JeopardyQuestionTile({ item, onClick }) {
  return (
    <motion.div
      className='jeopardy-board-tile text-jeopardy-gold'
      onClick={() => onClick(item)}
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
