export default function JeopardyQuestionTile({ item, onClick }) {
  return (
    <div
      className={`grid bg-jeopardy-blue text-jeopardy-gold cursor-pointer ${
        !item.clicked
          ? 'hover:scale-110 transition duration-150 ease-in-out'
          : ''
      }`}
      onClick={() => onClick(item)}
      style={{ cursor: item.clicked ? 'not-allowed' : 'pointer' }}
    >
      {!item.clicked && (
        <div className='place-self-center text-7xl text-shadow-jeopardy-board'>
          $ {item.amount}
        </div>
      )}
    </div>
  )
}
