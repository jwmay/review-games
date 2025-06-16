import { JeopardyProvider } from '../context/JeopardyContext'
import JeopardyHome from '../components/Jeopardy/JeopardyHome'

export const meta = () => {
  return [{ title: 'Jeopardy | Review Games' }]
}

export default function Jeopardy() {
  return (
    <JeopardyProvider>
      <JeopardyHome />
    </JeopardyProvider>
  )
}
