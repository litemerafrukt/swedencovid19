import Head from "next/head"
import { swedenCovid19 } from "../serversideData/sweden"
import {
  deathRate,
  inkubationPeriod,
  fromSymptomToDeath,
  timeToDoubleCases,
  estimateCasesBasedOnDeath,
  estimateInfectedBasedOnDeath
} from "../calculations/estimateCases"

import { CovidCountryData, FetchError, hasFetchError } from "../model/types"


type IndexProps = CovidCountryData | FetchError

export default function Index(props: IndexProps) {
  if (hasFetchError(props)) {
    return <div>{props.error}</div>
  }

  return <Data {...props} />
}

function Data({
  confirmed: { value: confirmed },
  deaths: { value: deaths },
  lastUpdate: updated,
  recovered: { value: recovered }
}: CovidCountryData) {
  const estimationInfected = estimateInfectedBasedOnDeath(deaths)
  const estimationCases = estimateCasesBasedOnDeath(deaths)

  return (
    <div className="container">
      <Head>
        <title>Covid19 estimate Sweden</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1 className="heading">Sweden</h1>
        <span className="date">{new Date(updated).toLocaleDateString("se")}</span>

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

        <section className="info">
          <p>
            Made by <a href="mailto:litemerafrukt@gmail.com">litemerafrukt</a>
          </p>
          <p>
            Repo @ <a href="https://github.com/litemerafrukt/swedencovid19">github</a>
          </p>
        </section>
      </main>

      <style jsx>{`
        .heading {
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .date {
          font-size: small;
        }
        .cases {
          margin: 3em 0;
        }

        .info {
          font-size: small;
          margin: 3em 0;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 1rem;
          margin: 0;
          font-family: "Special Elite", -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = swedenCovid19
