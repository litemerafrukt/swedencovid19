import AbortController from "abort-controller"
import fetch from "isomorphic-unfetch"
import { CovidCountryData, Error } from "../model/types"

export async function swedenCovid19(): Promise<{ props: CovidCountryData | Error }> {
  let timeoutId: NodeJS.Timeout | undefined = undefined

  try {
    const controller = new AbortController()
    timeoutId = setTimeout(() => controller.abort(), 4000)
    const response = await fetch("https://covid19.mathdro.id/api/countries/SE", {
      signal: controller.signal
    })

    if (!response.ok) {
      throw new Error("Error response from data service.")
    }

    const data = await response.json()

    return { props: data }
  } catch (e) {
    return { props: { error: e.message } }
  } finally {
    timeoutId !== undefined && clearTimeout(timeoutId)
  }
}
