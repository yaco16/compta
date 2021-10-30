import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

export default function BtnToggle() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div>
      <div onClick={toggleTheme} className={theme ? 'btn-toggle light' : 'btn-toggle dark'}>
      {theme ? 'Dark' : 'Light'}</div>
      <style jsx>{`
        .btn-toggle {
          top: 150px;
          right: 50px;
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

        .light {
          background: #333;
          color: #f1f1f1
        }

        .dark {
          background: #f1f1f1;
          color: #333
        }
      `}</style>
    </div>
  );
}
