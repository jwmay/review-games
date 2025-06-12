import Navbar from '../Navbar'
import JeopardyBoard from './JeopardyBoard'
import JeopardyIntro from './JeopardyIntro'
import JeopardyNavbarMenu from './JeopardyNavbarMenu'
import JeopardyQuestionCard from './JeopardyQuestionCard'
import JeopardyStartScreen from './JeopardyStartScreen'
import { useContextState } from './JeopardyContext'

export default function JeopardyHome() {
  const state = useContextState()

  let display
  if (state.data.main.length === 0) {
    // no data, display start screen with url input
    display = <JeopardyStartScreen />
  } else if (!state.status.isIntroDone && state.settings.showIntro) {
    // show intro animations and music if user settings allow it
    display = <JeopardyIntro />
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
