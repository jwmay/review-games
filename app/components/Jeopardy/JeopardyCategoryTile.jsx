import useFitText from 'use-fit-text'

export default function JeopardyCategoryTile({ category }) {
  const { fontSize, ref } = useFitText()

  return (
    <div className='grid bg-jeopardy-blue uppercase mb-4'>
      <div
        className='place-self-center text-4xl text-shadow-jeopardy-board tracking-wider'
        ref={ref}
        style={{ fontSize }}
      >
        {category}
      </div>
    </div>
  )
}
