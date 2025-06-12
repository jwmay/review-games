import { useEffect } from 'react'
import JeopardyCategoryTile from './JeopardyCategoryTile'
import JeopardyQuestionTile from './JeopardyQuestionTile'
import { useContextState, useContextDispatch } from './JeopardyContext'
import { JEOPARDY_SET_GAME_STATUS } from '../../actionTypes'

export default function JeopardyBoard({ data, onClick }) {
  const state = useContextState()
  const dispatch = useContextDispatch()

  useEffect(() => {
    // if the user has opted out of the intro, then set game status 'isStarted' to true when the board loads,
    // otherwise, this property is set when the intro completes
    if (!state.settings.showIntro) {
      dispatch({
        type: JEOPARDY_SET_GAME_STATUS,
        payload: { status: 'isStarted', value: true },
      })
    }
  }, [])

  return (
    <div className='animate-zoom-in bg-black h-screen grid grid-cols-[repeat(6,calc(95vw/6))] grid-rows-[repeat(6,calc(95vh/6))] gap-x-[1vw] gap-y-[1vh]'>
      {[...Array(6)].map((_, index) => (
        <JeopardyCategoryTile
          category={data[index].category}
          id={index}
          key={index}
        />
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
