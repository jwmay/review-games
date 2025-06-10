import { AutoTextSize } from 'auto-text-size'

export default function JeopardyCategoryTile({ category }) {
  return (
    // <div className='bg-jeopardy-blue uppercase p-4 justify-center text-center items-center-force tracking-widest leading-none'>
    <div className='jeopardy-board-tile'>
      <AutoTextSize as='h2' maxFontSizePx={500} mode='box'>
        {category}
      </AutoTextSize>
    </div>
  )
}
