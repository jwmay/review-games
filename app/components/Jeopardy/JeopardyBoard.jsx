import { useEffect } from 'react'
import JeopardyCategoryTile from './JeopardyCategoryTile'
import JeopardyQuestionTile from './JeopardyQuestionTile'

import { config } from '../../config'
import { useJeopardyState } from '../../context/JeopardyContext'
import { JEOPARDY_SET_STATUS } from '../../actionTypes'

export default function JeopardyBoard({ data }) {
  const { state, dispatch } = useJeopardyState()

  useEffect(() => {
    // Set game status 'isBoardVisible' after category tile animations are complete, if intro is shown
    const timer = setTimeout(
      () => {
        dispatch({
          type: JEOPARDY_SET_STATUS,
          payload: { status: 'isBoardVisible', value: true },
        })

        // If intro was not shown per user settings, mark it as shown
        if (state.settings.studyMode) {
          dispatch({
            type: JEOPARDY_SET_STATUS,
            payload: { status: 'isIntroDone', value: true },
          })
        }
      },
      !state.settings.studyMode ? 15000 : 0
    ) // 15 seconds or 0 seconds

    return () => clearTimeout(timer)
  }, [state.settings.studyMode])

  useEffect(() => {
    // Set 'isFinal' flag once all questions have been selected
    if (state.status.numClicked === config.jeopardy.numQuestions) {
      dispatch({
        type: JEOPARDY_SET_STATUS,
        payload: { status: 'isFinal', value: true },
      })
    }
  }, [state.status.numClicked])

  return (
    <div
      className={`${
        !state.settings.studyMode && !state.status.isBoardVisible
          ? 'animate-zoom-in'
          : ''
      } bg-black h-screen grid grid-cols-[repeat(6,calc(95vw/6))] grid-rows-[repeat(6,calc(95vh/6))] gap-x-[1vw] gap-y-[1vh]`}
    >
      {[...Array(config.jeopardy.numCategories)].map((_, index) => (
        <JeopardyCategoryTile
          category={data[index].category}
          id={index}
          key={index}
        />
      ))}
      {data.map((item) => (
        <JeopardyQuestionTile item={item} key={item.id} />
      ))}
    </div>
  )
}
