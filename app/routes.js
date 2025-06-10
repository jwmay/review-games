import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.jsx'),
  route('/jeopardy', 'routes/games.jeopardy.jsx'),
  route('/sabotage', 'routes/games.sabotage.jsx'),
  route('/sailing', 'routes/games.sailing.jsx'),
]
