import { createContext, useContext, useReducer } from 'react'

import {
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

const useStateValue = () => useContext(StateContext)
const useDispatchValue = () => useContext(DispatchContext)

export { JeopardyContext, useStateValue, useDispatchValue }
