import JeopardyCategoryTile from './JeopardyCategoryTile'
import JeopardyQuestionTile from './JeopardyQuestionTile'

export default function JeopardyBoard({ data, onClick }) {
  if (data.length === 0) return null

  return (
    <div className='bg-black h-screen grid grid-rows-6 grid-cols-6 place-items-stretch gap-4 font-jeopardy-board'>
      {[...Array(6)].map((_, index) => (
        <JeopardyCategoryTile category={data[index].category} key={index} />
      ))}
      {data.map((item) => (
        <JeopardyQuestionTile
          item={item}
          key={item.id}
          onClick={() => onClick(item)}
        />
      ))}
    </div>
  )
}
