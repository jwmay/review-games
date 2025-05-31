import { useSearchParams } from 'react-router'
import Incrementer from '../Incrementer'
import { config } from '../../config'

export default function SabotageNavbarMenu() {
  const [searchParams] = useSearchParams()
  const numGroups = searchParams.get('numGroups') || 10

  const changeColorsButtonClick = () => {
    alert(`numGroups: ${numGroups}`)
  }

  return (
    <>
      <li>
        <button className='py-3' onClick={changeColorsButtonClick}>
          Change Colors
        </button>
      </li>
      <li>
        <Incrementer
          description='Supports up to 12 Groups'
          initialValue={config.sabotage.numGroups.default}
          label='Groups'
          max={config.sabotage.numGroups.max}
          min={config.sabotage.numGroups.min}
          name='numGroups'
        />
      </li>
    </>
  )
}
