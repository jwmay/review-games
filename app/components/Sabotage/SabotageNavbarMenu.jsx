import Incrementer from '../Incrementer'
import { config } from '../../config'
import { useGenerateRandomColors } from '../../hooks'

export default function SabotageNavbarMenu({
  onColorsChange,
  onNumGroupsChange,
}) {
  function handleColorsChangeButtonClick() {
    const colors = useGenerateRandomColors(config.sabotage.numGroups.max)
    onColorsChange(colors)
  }

  return (
    <>
      <li>
        <button className='py-3' onClick={handleColorsChangeButtonClick}>
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
          onChange={onNumGroupsChange}
        />
      </li>
    </>
  )
}
