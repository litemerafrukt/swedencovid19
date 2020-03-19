import Head from "next/head"
import { swedenCovid19 } from "../serversideData/sweden"
import {
  deathRate,
  daysFromSymptomToDeath,
  daysToDoubleCases,
  estimateCasesBasedOnDeath
} from "../calculations/estimateCases"

export default function Index(props) {
  if (props.error) {
    return <div>{props.error}</div>
  }

  return <Data {...props} />
}

function Data({
  confirmed: { value: confirmed },
  deaths: { value: deaths },
  lastUpdate: updated,
  recovered: { value: recovered }
}) {
  const estimation = estimateCasesBasedOnDeath(deaths)

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
          <p>{estimation} estimated cases.</p>
          <p>{recovered} recovered cases</p>
        </section>

        <section className="calculation-info">
          <h5>Estimations based on:</h5>
          <ul>
            <li>Death-rate: {deathRate * 100}%</li>
            <li>Symptom to death: {daysFromSymptomToDeath} days</li>
            <li>Cases double in: {daysToDoubleCases} days</li>
          </ul>
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
          margin: 3rem 0 5rem 0;
        }

        .calculation-info {
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
