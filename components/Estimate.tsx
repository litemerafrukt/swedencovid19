import { CovidCaseData } from "../model/types"
import { estimateBasedOnDeath } from "../model/estimateCases"
import {
  deathRate as defaultDeathRate,
  incubationPeriod as defaultIncubationPeriod,
  fromSymptomToDeath as defaultSymptomToDeath,
  timeToDoubleCases as defaultTimeToDouble
} from "../model/defaultSicknessConstants"
import { useState } from "react"

export default function Estimate({ confirmed, deaths, recovered }: CovidCaseData) {
  const [deathRate, setDeathRate] = useState(defaultDeathRate)
  const [showDeathRateSlider, setDeathRateSlider] = useState(false)

  const [incubationPeriod, setIncubationPeriod] = useState(
    defaultIncubationPeriod as number
  )
  const [showIncubationSlider, setIncubationSlider] = useState(false)

  const [symptomToDeath, setSymptomToDeath] = useState(defaultSymptomToDeath as number)
  const [showSymptomToDeathSlider, setSymptomToDeathSlider] = useState(false)

  const [timeToDoubleCases, setTimeToDoubleCases] = useState(
    defaultTimeToDouble as number
  )
  const [showTimeToDoubleCasesSlider, setTimeToDoubleCasesSlider] = useState(false)

  const estimationInfected = estimateBasedOnDeath(
    deaths,
    deathRate,
    incubationPeriod + symptomToDeath,
    timeToDoubleCases
  )
  const estimationCases = estimateBasedOnDeath(
    deaths,
    deathRate,
    symptomToDeath,
    timeToDoubleCases
  )
  return (
    <>
      <section className="cases">
        <p>{confirmed} confirmed cases.</p>
        <p>{deaths} deaths.</p>
        <p>{recovered} recovered cases.</p>
        <p>{Math.max(estimationCases, confirmed)} estimated cases.</p>
        <p>{Math.max(estimationInfected, confirmed)} estimated infected.</p>
      </section>

      <section>
        <h5>Estimations based on</h5>
        <ul className="var-list">
          <li>
            <div className="var-item">
              Death-rate:{" "}
              <span className="var" onClick={() => setDeathRateSlider(show => !show)}>
                {(deathRate * 100).toFixed(1)}%
              </span>
              {showDeathRateSlider && (
                <input
                  type="range"
                  value={deathRate}
                  min="0.001"
                  max="0.09"
                  step="0.001"
                  onChange={({ target }) => setDeathRate(Number(target.value))}
                />
              )}
            </div>
          </li>
          <li>
            <div className="var-item">
              Incubation period:{" "}
              <span className="var" onClick={() => setIncubationSlider(show => !show)}>
                {incubationPeriod} days
              </span>
              {showIncubationSlider && (
                <input
                  type="range"
                  value={incubationPeriod}
                  min="1"
                  max="21"
                  step="1"
                  onChange={({ target }) => setIncubationPeriod(Number(target.value))}
                />
              )}
            </div>
          </li>
          <li>
            <div className="var-item">
              Symptom to death:{" "}
              <span
                className="var"
                onClick={() => setSymptomToDeathSlider(show => !show)}
              >
                {symptomToDeath} days
              </span>
              {showSymptomToDeathSlider && (
                <input
                  type="range"
                  value={symptomToDeath}
                  min="5"
                  max="27"
                  step="1"
                  onChange={({ target }) => setSymptomToDeath(Number(target.value))}
                />
              )}
            </div>
          </li>
          <li>
            <div className="var-item">
              Cases double in:{" "}
              <span
                className="var"
                onClick={() => setTimeToDoubleCasesSlider(show => !show)}
              >
                {timeToDoubleCases} days
              </span>
              {showTimeToDoubleCasesSlider && (
                <input
                  type="range"
                  value={timeToDoubleCases}
                  min="2"
                  max="21"
                  step="1"
                  onChange={({ target }) => setTimeToDoubleCases(Number(target.value))}
                />
              )}
            </div>
          </li>
        </ul>
      </section>

      <style jsx>{`
        .cases {
          margin: 3em 0;
          font-size: larger;
        }
        .var-list {
        }
        .var-item {
          display: flex;
          align-items: center;
          height: 2em;
        }
        .var {
          border-bottom: 2px dashed black;
          cursor: pointer;
          margin: 0 0.5em;
        }
      `}</style>
    </>
  )
}
