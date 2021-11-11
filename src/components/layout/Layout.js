import { useContext } from 'react';
import Navbar from './Sidebar';
import { ThemeContext } from '../../context/themeContext';

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <body className={theme ? 'lightTheme' : 'darkTheme'}>
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

        .darkTheme {
          color: #f1f1f1;
          background-color: #333;
        }

        .lightTheme {
          color: #333;
          background-color: white;
        }
      `}</style>
    </body>
  );
}
