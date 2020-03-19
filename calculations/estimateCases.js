export const deathRate = 0.008
export const daysFromSymptomToDeath = 14
export const daysToDoubleCases = 7

export function estimateCasesBasedOnDeath(deaths) {
  const estimation =
    (deaths / deathRate) * 2 ** (daysFromSymptomToDeath / daysToDoubleCases)

  return Math.round(estimation / 100) * 100
}
