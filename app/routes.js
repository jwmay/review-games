import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.jsx'),
  route('/sabotage', 'routes/games.sabotage.jsx'),
]
