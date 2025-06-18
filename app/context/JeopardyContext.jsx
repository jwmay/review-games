import { createContext, useContext, useEffect, useReducer } from 'react'
import { useSearchParams } from 'react-router'

import { config } from '../config'

import {
  JEOPRADY_RESTART_GAME,
  JEOPARDY_SAVE_SETTINGS,
  JEOPARDY_SET_CLICKED,
  JEOPARDY_SET_DATA,
  JEOPARDY_SET_SCORE,
  JEOPARDY_SET_STATUS,
} from '../actionTypes'

const JeopardyContext = createContext()

const defaultState = {
  data: { main: [], final: {} },
  settings: {
    numTeams: config.jeopardy.numTeams.default,
    showAmount: false,
    showScoreboard: true,
    studyMode: false,
    useSoundEffects: true,
  },
  spreadsheetId: '',
  status: {
    isBoardVisible: false,
    isDataLoaded: false,
    isFinal: false,
    isIntroDone: false,
    isScoring: false,
    numClicked: 0,
    scores: new Array(10).fill(0),
    selected: null,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case JEOPRADY_RESTART_GAME:
      return {
        ...defaultState,
        settings: { ...state.settings },
        spreadsheetId: state.spreadsheetId,
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
        spreadsheetId: action.payload.spreadsheetId,
        status: { ...state.status, isDataLoaded: true },
      }
    case JEOPARDY_SET_SCORE:
      const newScores = [...state.status.scores]
      newScores[action.payload.id] =
        newScores[action.payload.id] + parseInt(action.payload.score)
      return { ...state, status: { ...state.status, scores: newScores } }
    case JEOPARDY_SET_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          [action.payload.status]: action.payload.value,
        },
      }
    default:
      return state
  }
}

const JeopardyProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    spreadsheetId: '',
    studyMode: false,
  })

  const initialState = {
    ...defaultState,
    settings: {
      ...defaultState.settings,
      studyMode:
        JSON.parse(searchParams.get('studyMode')) ||
        defaultState.settings.studyMode,
    },
    spreadsheetId:
      searchParams.get('spreadsheetId') || defaultState.spreadsheetId,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Keep searchParams in sync with state
  useEffect(() => {
    // Set search params once we have a valid spreadsheet Id
    if (state.spreadsheetId !== '') {
      setSearchParams((searchParams) => {
        searchParams.set('spreadsheetId', state.spreadsheetId)
        searchParams.set('studyMode', state.settings.studyMode)
        return searchParams
      })
    }
  }, [state.settings.studyMode, state.spreadsheetId])

  return (
    <JeopardyContext.Provider value={{ state, dispatch }}>
      {children}
    </JeopardyContext.Provider>
  )
}

const useJeopardyState = () => useContext(JeopardyContext)

export { JeopardyProvider, useJeopardyState }
