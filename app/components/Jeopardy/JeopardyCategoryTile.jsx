import { AutoTextSize } from 'auto-text-size'

export default function JeopardyCategoryTile({ category }) {
  return (
    <div className='jeopardy-board-tile mb-[1vh]'>
      <AutoTextSize as='h2' maxFontSizePx={500} mode='box'>
        {category}
      </AutoTextSize>
    </div>
  )
}
