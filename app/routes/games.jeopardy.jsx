import JeopardyHome from '../components/Jeopardy/JeopardyHome'

import { JeopardyProvider } from '../context/JeopardyContext'

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
