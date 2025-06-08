export default function JeopardyCategoryTile({ category }) {
  return (
    <div className='grid bg-jeopardy-blue uppercase mb-4'>
      <div className='place-self-center text-4xl text-shadow-jeopardy-board tracking-wider'>
        {category}
      </div>
    </div>
  )
}
