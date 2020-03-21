export type Error = { error: string }

export type CovidCountryData = {
  confirmed: { value: number }
  deaths: { value: number }
  lastUpdate: string
  recovered: { value: number }
}

export function hasError(props: Error | any): props is Error {
  return (props as Error).error !== undefined
}
