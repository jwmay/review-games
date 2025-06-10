import { AutoTextSize } from 'auto-text-size'

export default function JeopardyQuestionTile({ item, onClick }) {
  return (
    <div
      className={`jeopardy-board-tile text-jeopardy-gold ${
        !item.clicked
          ? 'hover:scale-110 transition duration-150 ease-in-out'
          : ''
      }`}
      onClick={() => onClick(item)}
      style={{ cursor: item.clicked ? 'not-allowed' : 'pointer' }}
    >
      {!item.clicked && (
        <AutoTextSize as='h2' maxFontSizePx={500} mode='box'>
          $ {item.amount}
        </AutoTextSize>
      )}
    </div>
  )
}
