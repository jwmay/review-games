import Incrementer from '../Incrementer'

import { config } from '../../config'
import { useGenerateRandomColors } from '../../hooks'

export default function SabotageNavbarMenu({
  onColorsChange,
  onNumBoxesChange,
  onNumGroupsChange,
}) {
  function handleColorsChangeButtonClick() {
    const colors = useGenerateRandomColors(config.sabotage.numGroups.max)
    onColorsChange(colors)
  }

  return (
    <>
      <li className='py-2'>
        <Incrementer
          description='Supports up to 20 boxes'
          initialValue={config.sabotage.numBoxes.default}
          label='Boxes'
          max={config.sabotage.numBoxes.max}
          min={config.sabotage.numBoxes.min}
          name='numBoxes'
          onChange={onNumBoxesChange}
        />
      </li>
      <li className='py-2'>
        <button onClick={handleColorsChangeButtonClick}>Change Colors</button>
      </li>
      <li className='py-2'>
        <Incrementer
          description='Supports up to 20 groups'
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
