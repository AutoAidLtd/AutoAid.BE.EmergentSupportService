export interface ActiveUsersDashboardDto {
  current : {
    [key:string]: number
  }
  previous: {
    [key:string]: number
  },
  percentageComparisonToPrevious: number,
}
