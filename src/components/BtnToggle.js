import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

export default function BtnToggle() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className='container'>
      <div onClick={toggleTheme} className={theme ? 'btn-toggle light' : 'btn-toggle dark'}>
        {theme ? 'Dark' : 'Light'}
      </div>
      <style jsx>{`
        .container {
          margin-top: 2rem;
          display: flex;
          justify-content: center;

        }
        .btn-toggle {
          width: 50px;
          height: 50px;
          border: 1px solid #333;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .dark {
          color: #333;
          background: #f1f1f1;
        }

        .light {
          color: #f1f1f1;
          background: #333;
        }
      `}</style>
    </div>
  );
}
