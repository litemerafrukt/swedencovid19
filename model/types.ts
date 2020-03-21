export type FetchError = Readonly<{ error: string }>

export function hasFetchError(props: FetchError | any): props is FetchError {
  return (props as FetchError).error !== undefined
}

export type CovidCountryData = Readonly<{
  confirmed: { value: number }
  deaths: { value: number }
  lastUpdate: string
  recovered: { value: number }
}>

export type CovidCaseData = Omit<CovidCountryData, "lastUpdate">

export type Days = number & { _brand: "days" }
