import Link from 'next/link';

export default function Navbar() {
  return (
    <div id='navbar_container'>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/dashboard/turnover'>
            <a>Chiffre d&#39;affaires</a>
          </Link>
        </li>
        <li>
          <Link href='/dashboard/trialbalance'>
            <a>Balance générale</a>
          </Link>
        </li>
        <li>
          <Link href='/dashboard/extractiondb'>
            <a>Extraction database</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        #navbar_container {
          padding: 0.5rem;
          background-color: grey;
          width: 15%;
          position: absolute;
          top: 0;
          height: 100vh;
        }

        li {
          color: white;
          list-style-type: none;
          cursor: pointer;
          margin-bottom: 0.2rem;
        }
        li:hover {
          text-decoration: underline;
          text-underline-position: under;

        }
      `}</style>
    </div>
  );
}
