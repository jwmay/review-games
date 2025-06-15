import { createContext, useContext, useReducer } from 'react'

import {
  JEOPRADY_LOAD_NEW_SPREADSHEET,
  JEOPRADY_RESET_GAME_BOARD,
  JEOPARDY_SAVE_SETTINGS,
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_DATA,
  JEOPARDY_SET_GAME_STATUS,
  JEOPARDY_SET_SELECTED,
} from '../../actionTypes'

const JeopardyContext = createContext()

const initialState = {
  data: { main: [], final: {} },
  selected: null,
  settings: { showAmount: false, studyMode: false },
  status: {
    isBoardVisible: false,
    isDataLoaded: false,
    isFinal: false,
    isIntroDone: false,
    numClicked: 0,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case JEOPRADY_LOAD_NEW_SPREADSHEET:
      return { ...initialState, settings: { ...state.settings } }
    case JEOPRADY_RESET_GAME_BOARD:
      return {
        ...state,
        data: {
          ...state.data,
          main: state.data.main.map((item) => ({ ...item, clicked: false })),
        },
        status: { ...state.status, isFinal: false, numClicked: 0 },
      }
    case JEOPARDY_SAVE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.setting]: action.payload.value,
        },
      }
    case JEOPARDY_SET_CLICKED:
      return {
        ...state,
        data: {
          ...state.data,
          main: state.data.main.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, clicked: true }
            } else {
              return item
            }
          }),
        },
      }
    case JEOPARDY_SET_DATA:
      return {
        ...state,
        data: action.payload.data,
        status: { ...state.status, isDataLoaded: true },
      }
    case JEOPARDY_SET_GAME_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.status]: action.payload.value,
        },
      }
    case JEOPARDY_SET_SELECTED:
      return { ...state, selected: action.payload.selected }
    default:
      return state
  }
}

const JeopardyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <JeopardyContext.Provider value={{ state, dispatch }}>
      {children}
    </JeopardyContext.Provider>
  )
}

const useJeopardyState = () => useContext(JeopardyContext)

export { JeopardyProvider, useJeopardyState }
