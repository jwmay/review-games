export const config = {
  jeopardy: {
    maxQuestions: 6 * 5,
    numTeams: {
      default: 10,
      max: 10,
      min: 2,
    },
    sheet: {
      dims: { cols: 4, rows: 32 },
      name: 'DO_NOT_EDIT_OR_DELETE',
    },
    templateUrl:
      'https://docs.google.com/spreadsheets/d/1npHrnbEenbTDgM7WkvO7adLpbTczJXKAt5bFt-0u-JQ/copy',
  },
  sabotage: {
    numBoxes: {
      default: 20,
      max: 20,
      min: 2,
    },
    numGroups: {
      default: 10,
      max: 20,
      min: 2,
    },
  },
}
