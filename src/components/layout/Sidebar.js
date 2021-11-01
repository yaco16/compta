import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import ToggleDarkMode from '../ToggleDarkMode';

export default function Navbar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme ? 'navbar_container light' : 'navbar_container dark'}>
    <ToggleDarkMode />
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
      <style jsx>{`
        .navbar_container {
          padding: 0.5rem;
          position: fixed;
          top: 15%;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
        }

        .light {
          background-color: grey;
        }

        .dark  {
          border: 1px solid white;
          background-color: rgb(56, 56, 56);
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
