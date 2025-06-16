import { createContext, useContext, useReducer } from 'react'

import { config } from '../config'
import { useGenerateRandomColors } from '../hooks'

import {
  SABOTAGE_RESTART_GAME,
  SABOTAGE_SAVE_SETTINGS,
  SABOTAGE_SET_SCORE,
} from '../actionTypes'

const SabotageContext = createContext()

const defaultState = {
  scores: new Array(config.sabotage.numGroups.max).fill(0),
  settings: {
    colors: useGenerateRandomColors(config.sabotage.numGroups.max),
    numBoxes: config.sabotage.numBoxes.default,
    numGroups: config.sabotage.numGroups.default,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case SABOTAGE_RESTART_GAME:
      return { ...state, scores: [...defaultState.scores] }
    case SABOTAGE_SAVE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.setting]: action.payload.value,
        },
      }
    case SABOTAGE_SET_SCORE:
      const newScores = [...state.scores]
      newScores[action.payload.id] = action.payload.score
      return {
        ...state,
        scores: newScores,
      }
    default:
      return state
  }
}

const SabotageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <SabotageContext.Provider value={{ state, dispatch }}>
      {children}
    </SabotageContext.Provider>
  )
}

const useSabotageState = () => useContext(SabotageContext)

export { SabotageProvider, useSabotageState }
