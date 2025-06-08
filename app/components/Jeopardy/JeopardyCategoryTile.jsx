import useTextFit from 'use-text-fit'

export default function JeopardyCategoryTile({ category }) {
  const { fontSize, ref } = useTextFit()

  return (
    <div className='grid bg-jeopardy-blue uppercase mb-4'>
      <div
        className='place-self-center text-4xl text-shadow-jeopardy-board tracking-wider'
        //   ref={ref}
        //   style={{ fontSize, height: 100, width: 100 }}
      >
        {category}
      </div>
    </div>
  )
}
