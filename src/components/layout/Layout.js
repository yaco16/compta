import { useContext } from 'react';
import Navbar from './Sidebar';
import { ThemeContext } from '../../context/themeContext';

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme ? 'light' : 'dark'}>
      <Navbar />
      <main>{children}</main>
      <style jsx global>{`
        main {
          margin-left: 20%;
          margin-right: 10%;
        }

        h1 {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 1rem 0.5rem 0 0.5rem;
          margin-bottom: 1rem;
        }

        .dark {
          color: #f1f1f1;
          background: #333;
        }

        .light {
          color: #333;
          background: #f1f1f1;
        }
      `}</style>
    </div>
  );
}
