import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import BtnToggle from '../BtnToggle';

export default function Navbar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme ? 'navbar_container light' : 'navbar_container dark'}>
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
        <li>
          <Link href='/dashboard/upload'>
            <a>Upload files</a>
          </Link>
        </li>
      </ul>
      <BtnToggle />
      <style jsx>{`
        .navbar_container {
          padding: 0.5rem;
          position: absolute;
          top: 0;
          height: 100vh;
        }

        .light {
          color: #333;
          background: grey;
        }

        .dark {
          color: #f1f1f1;
          background: #333;
        }

        li {
          color: white;
          list-style-type: none;
          cursor: pointer;
          margin-bottom: 0.4rem;
        }
        li:hover {
          text-decoration: underline;
          text-underline-position: under;

        }
      `}</style>
    </div>
  );
}
