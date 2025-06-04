import useGoogleSheets from 'use-google-sheets'

export function useGenerateRandomColors(numGroups) {
  return [...Array(numGroups)].map(() => {
    const colorCode = Math.random().toString(16)
    return `#${colorCode.substring(colorCode.length - 6)}`
  })
}

export function useGoogleSheetsReader(sheetId) {
  try {
    const { data, loading, error } = useGoogleSheets({
      apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
      sheetId,
      // sheetId: '1npHrnbEenbTDgM7WkvO7adLpbTczJXKAt5bFt-0u-JQ',
    })

    if (error) {
      if (error.response.status === 403) {
        error.message =
          'You must set "General access" to "Anyone with the link" in the share settings for this Google Sheets file.'
      } else if (error.response.status === 404) {
        error.message =
          'File not found. Please provide a valid Google Sheets file url.'
      } else if (error.response.status === 429) {
        error.message = 'Request limit exceeded. Wait 1 minute and try again.'
      } else {
        error.message = JSON.stringify(error.response)
      }
    }

    return { data, loading, error }
  } catch (error) {
    if (error.name === 'TypeError' && !sheetId) {
      // ignore TypeError when Google api is called without sheetId
      return { data: null, loading: false, error: null }
    } else {
      return { data: null, loading: false, error }
    }
  }
}
