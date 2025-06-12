import { AutoTextSize } from 'auto-text-size'

export default function JeopardyCategoryTile({ category, id }) {
  return (
    <div className='jeopardy-board-tile mb-[1vh]'>
      <AutoTextSize
        as='h2'
        className='animate-zoom-in'
        maxFontSizePx={500}
        mode='box'
        style={{ animationDelay: `${id + 3}s` }}
      >
        {category}
      </AutoTextSize>
    </div>
  )
}
