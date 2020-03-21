import { CovidCaseData } from "../model/types"
import { estimateBasedOnDeath } from "../model/estimateCases"
import {
  deathRate,
  inkubationPeriod,
  fromSymptomToDeath,
  timeToDoubleCases
} from "../model/defaultSicknessConstants"

export default function Estimate({ confirmed, deaths, recovered }: CovidCaseData) {
  const estimationInfected = estimateBasedOnDeath(
    deaths,
    deathRate,
    inkubationPeriod + fromSymptomToDeath,
    timeToDoubleCases
  )
  const estimationCases = estimateBasedOnDeath(
    deaths,
    deathRate,
    fromSymptomToDeath,
    timeToDoubleCases
  )
  return (
    <>
      <section className="cases">
        <p>{confirmed} confirmed cases.</p>
        <p>{deaths} deaths.</p>
        <p>{recovered} recovered cases.</p>
        <p>{estimationCases} estimated cases.</p>
        <p>{estimationInfected} estimated infected.</p>
      </section>

      <section>
        <h5>Estimations based on</h5>
        <ul>
          <li>Death-rate: {deathRate * 100}%</li>
          <li>Inkubation period: {inkubationPeriod} days</li>
          <li>Symptom to death: {fromSymptomToDeath} days</li>
          <li>Cases double in: {timeToDoubleCases} days</li>
        </ul>
      </section>

      <style jsx>{`
        .cases {
          margin: 3em 0;
        }
      `}</style>
    </>
  )
}
