import { AutoTextSize } from 'auto-text-size'

import { useJeopardyState } from '../../context/JeopardyContext'

export default function JeopardyCategoryTile({ category, id }) {
  const { state } = useJeopardyState()

  return (
    <div className='jeopardy-board-tile mb-[1vh]'>
      <AutoTextSize
        as='h2'
        className={
          !state.settings.studyMode && !state.status.isBoardVisible
            ? 'animate-zoom-in'
            : ''
        }
        maxFontSizePx={500}
        mode='box'
        style={{ animationDelay: `${id * 2 + 3}s` }}
      >
        {category}
      </AutoTextSize>
    </div>
  )
}
