// import { useState } from 'react'

const useGenerateRandomColor = () => {
  return `#${Math.random().toString(16).substr(-6)}`
}
// const useGenerateRandomColor = () => {
//   const [color, setColor] = useState('')
//   const generateColor = () => {
//     setColor(Math.random().toString(16).substr(-6))
//   }
//   return { color, generateColor }
// }
export default useGenerateRandomColor
