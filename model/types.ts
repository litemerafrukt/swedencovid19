export type FetchError = Readonly<{ error: string }>

export function hasFetchError(props: FetchError | any): props is FetchError {
  return (props as FetchError).error !== undefined
}

export type CovidCountryData = Readonly<{
  confirmed: number
  deaths: number
  updated: string
  recovered: number
}>

export type CovidCaseData = Omit<CovidCountryData, "updated">

export type Days = number & { _brand: "days" }
