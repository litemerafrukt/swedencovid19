export default function Footer() {
  return (
    <>
      <section className="info">
        <p>
          Made by <a href="mailto:litemerafrukt@gmail.com">litemerafrukt</a>
        </p>
        <p>
          Repo @ <a href="https://github.com/litemerafrukt/swedencovid19">github</a>
        </p>
      </section>

      <style jsx>{`
        .info {
          font-size: small;
          margin: 3em 0;
        }
      `}</style>
    </>
  )
}
