import { JeopardyContext } from '../components/Jeopardy/JeopardyContext'
import JeopardyHome from '../components/Jeopardy/JeopardyHome'

export const meta = () => {
  return [{ title: 'Jeopardy | Review Games' }]
}

export default function Jeopardy() {
  return (
    <JeopardyContext>
      <JeopardyHome />
    </JeopardyContext>
  )
}
