import { useEffect } from 'react'
import { useAudioPlayer } from 'react-use-audio-player'
import Navbar from '../Navbar'
import JeopardyBoard from './JeopardyBoard'
import JeopardyFinalCard from './JeopardyFinalCard'
import JeopardyIntro from './JeopardyIntro'
import JeopardyNavbarMenu from './JeopardyNavbarMenu'
import JeopardyQuestionCard from './JeopardyQuestionCard'
import JeopardyScoreboard from './JeopardyScoreboard'
import JeopardyStartScreen from './JeopardyStartScreen'
import { useJeopardyState } from '../../context/JeopardyContext'

export default function JeopardyHome() {
  const { state } = useJeopardyState()

  const { isPlaying, play, stop } = useAudioPlayer(
    'audio/jeopardy-intro-music.mp3',
    { autoplay: false }
  )

  useEffect(() => {
    if (
      state.status.isDataLoaded &&
      !state.status.isIntroDone &&
      !state.settings.studyMode &&
      !isPlaying
    ) {
      play()
    } else if (
      (state.settings.studyMode || !state.status.isDataLoaded) &&
      isPlaying
    ) {
      stop()
    }
  }, [
    state.settings.studyMode,
    state.status.isDataLoaded,
    state.status.isIntroDone,
  ])

  let display
  if (!state.status.isDataLoaded) {
    // no data, display start screen with url input
    display = <JeopardyStartScreen />
  } else if (!state.status.isIntroDone && !state.settings.studyMode) {
    // show intro animations and music if user settings allow it
    display = <JeopardyIntro />
  } else if (
    state.status.isScoring &&
    state.settings.showScoreboard &&
    !state.settings.studyMode
  ) {
    // show scoreboard if user settings allow it
    display = <JeopardyScoreboard />
  } else if (state.status.isFinal) {
    // show the Final Jeopardy question then answer
    display = <JeopardyFinalCard />
  } else if (!state.selected) {
    // data but no question selected, display full board
    display = <JeopardyBoard data={state.data.main} />
  } else {
    // data and question selected, show question then answer
    display = <JeopardyQuestionCard item={state.selected} />
  }

  return (
    <div>
      <Navbar allowFullscreen menu={<JeopardyNavbarMenu />} title='Jeopardy' />
      {display}
    </div>
  )
}
