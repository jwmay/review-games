export function useGenerateRandomColors(numGroups) {
  return [...Array(numGroups)].map(() => {
    const colorCode = Math.random().toString(16)
    return `#${colorCode.substring(colorCode.length - 6)}`
  })
}
