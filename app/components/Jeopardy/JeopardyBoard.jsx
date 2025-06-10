import JeopardyCategoryTile from './JeopardyCategoryTile'
import JeopardyQuestionTile from './JeopardyQuestionTile'

export default function JeopardyBoard({ data, onClick }) {
  return (
    <div className='bg-black h-screen grid grid-cols-[repeat(6,calc(95vw/6))] grid-rows-[repeat(6,calc(95vh/6))] gap-x-[1vw] gap-y-[1vh]'>
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
