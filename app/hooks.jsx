export function useGenerateRandomColors(numGroups) {
  return [...Array(numGroups)].map(() => {
    const colorCode = Math.random().toString(16)
    return `#${colorCode.substring(colorCode.length - 6)}`
  })
}

export function useGoogleSheetsUrl(spreadsheetId, mode = 'edit') {
  if (!spreadsheetId) return ''
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/${mode}`
}
