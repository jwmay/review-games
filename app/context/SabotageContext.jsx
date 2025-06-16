import { createContext, useContext, useReducer } from 'react'

import { config } from '../config'
import { useGenerateRandomColors } from '../hooks'

import { SABOTAGE_SAVE_SETTINGS } from '../actionTypes'

const SabotageContext = createContext()

const defaultState = {
  settings: {
    colors: useGenerateRandomColors(config.sabotage.numGroups.max),
    numBoxes: config.sabotage.numBoxes.default,
    numGroups: config.sabotage.numGroups.default,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case SABOTAGE_SAVE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.setting]: action.payload.value,
        },
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
