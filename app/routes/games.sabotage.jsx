import SabotageHome from '../components/Sabotage/SabotageHome'

export const meta = () => {
  // @todo: how to update this dynamically? don't want this on every route
  return [{ title: 'Sabotage | Review Games' }]
}

export default function Sabotage() {
  return <SabotageHome />
}
