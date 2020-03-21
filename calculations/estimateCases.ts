import { Days } from "../model/types"

export const deathRate = 0.008
export const inkubationPeriod = 5 as Days
export const fromSymptomToDeath = 15 as Days
export const timeToDoubleCases = 7 as Days

export function estimateCasesBasedOnDeath(deaths: number): number {
  const estimation = (deaths / deathRate) * 2 ** (fromSymptomToDeath / timeToDoubleCases)

  return Math.round(estimation / 100) * 100
}

export function estimateInfectedBasedOnDeath(deaths: number): number {
  const estimation =
    (deaths / deathRate) *
    2 ** ((inkubationPeriod + fromSymptomToDeath) / timeToDoubleCases)

  return Math.round(estimation / 100) * 100
}
