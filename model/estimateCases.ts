export function estimateBasedOnDeath(
  deaths: number,
  deathRate: number,
  timeToDeath: number,
  timeToDoubleCases: number
) {
  const estimation = (deaths / deathRate) * 2 ** (timeToDeath / timeToDoubleCases)

  return Math.round(estimation / 100) * 100
}
