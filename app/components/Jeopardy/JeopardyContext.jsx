import { createContext, useContext, useReducer } from 'react'

import {
  JEOPRADY_LOAD_NEW_SPREADSHEET,
  JEOPRADY_RESET_GAME_BOARD,
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_DATA,
  JEOPARDY_SET_SELECTED,
  JEOPARDY_SET_SPREADSHEET_ID,
} from '../../actionTypes'

const StateContext = createContext()
const DispatchContext = createContext()

const initialState = {
  data: [],
  selected: null,
  spreadsheetId: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case JEOPRADY_LOAD_NEW_SPREADSHEET:
      return initialState
    case JEOPRADY_RESET_GAME_BOARD:
      return {
        ...state,
        data: state.data.map((item) => ({ ...item, clicked: false })),
      }
    case JEOPARDY_SET_CLICKED:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, clicked: true }
          } else {
            return item
          }
        }),
      }
    case JEOPARDY_SET_DATA:
      return { ...state, data: action.payload.data }
    case JEOPARDY_SET_SELECTED:
      return { ...state, selected: action.payload.selected }
    case JEOPARDY_SET_SPREADSHEET_ID:
      return { ...state, spreadsheetId: action.payload.spreadsheetId }
    default:
      return state
  }
}

const JeopardyContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useState = () => useContext(StateContext)
const useDispatch = () => useContext(DispatchContext)

export { JeopardyContext, useState, useDispatch }
