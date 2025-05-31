export function useGenerateRandomColor() {
  const colorCode = Math.random().toString(16)
  return `#${colorCode.substring(colorCode.length - 6)}`
}
