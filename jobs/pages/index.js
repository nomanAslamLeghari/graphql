import Head from 'next/head'
import { gql } from "@apollo/client";
import client from "../apollo-client";
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
    query Jobs{
      jobs{
        title
        slug
        locationNames
        company{
          name
        }
        cities{
          name
          country{
            isoCode
          }
        }
        tags{
          name
        }
      }
    }
    `,
  });

  return {
    props: {
      jobs: data.jobs,
    },
 };
}

export default function Home({jobs}) {
  return (
    <div className="container">
      <Head>
        <title>Graphql jobs api</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Graphql Jobs
        </h1>
        <div className="grid">
        {jobs.map((job) => (
    <div key={job.title} className="card">
      <div className="grid">
        <div className="carde">
        <h3>{job.title}</h3>
        <p>
            {job.company?.name}
        </p>
        </div>
        <div className="carde">
          <div className="tags-container">
            {
              job.tags.map((tag)=>
              <div className="myBox">{tag.name}</div>)
            }
            </div>
        </div>
        <div className="carde">
          
          {job.cities[0]?.country?.isoCode?(
          <img src={`https://flagcdn.com/16x12/${job.cities[0].country.isoCode}.png`}/>
          ):null}
          <span style={{marginLeft:'4px'}}>{job.locationNames ? job.locationNames : (job.cities && job.cities[0]?.name ? job.cities[0].name : "Remote")}</span>
        </div>
      </div>
    </div>
  ))}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
    .tags-container{
      display: flex;
      flex-wrap: wrap;
    }
    
    .tags-container > div {
      margin: 2px;
      padding: 10px;
      display: inline-block;
      text-align: center;
      line-height: 12px;
      font-size: 15px;
      border: 1px solid black;
      border-radius:4px;
    }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 100%;
          margin-top: 3rem;
        }

        .carde {
          margin: 0.1rem;
          flex-basis: 33%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card {
          margin: 1rem;
          flex-basis: 100%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
