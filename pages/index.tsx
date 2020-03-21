import Head from "next/head"
import { swedenCovid19 } from "../serversideData/sweden"
import { estimateBasedOnDeath } from "../model/estimateCases"
import {
  deathRate,
  inkubationPeriod,
  fromSymptomToDeath,
  timeToDoubleCases
} from "../model/defaultSicknessConstants"
import { CovidCountryData, FetchError, hasFetchError } from "../model/types"
import Footer from "../components/Footer"
import Estimate from "../components/Estimate"

type IndexProps = CovidCountryData | FetchError

export default function Index(props: IndexProps) {
  if (hasFetchError(props)) {
    return <div>{props.error}</div>
  }

  return <Data {...props} />
}

function Data({ updated, ...caseData }: CovidCountryData) {
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

        <Estimate {...caseData} />

        <Footer />
      </main>

      <style jsx>{`
        .heading {
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .date {
          font-size: small;
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
