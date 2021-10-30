import {useContext} from 'react';
import Navbar from './Sidebar';
import {ThemeContext} from '../../context/themeContext';

export default function Layout({ children }) {
const {theme} = useContext(ThemeContext);
  return (
    <div className={theme ? 'light' : 'dark'}>
      <Navbar />
      <main>{children}</main>
      <style jsx global>{`
        main {
          margin-left: 16%;
        }

        h1 {
          text-align: center;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
}
