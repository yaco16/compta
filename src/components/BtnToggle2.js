import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function BtnToggle() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div className='container'>
      <input type='checkbox' className='checkbox' id='chk' onClick={toggleTheme} />
      <label className='label' htmlFor='chk'>
        <span className='svg'>
          <FontAwesomeIcon icon={faSun} />
        </span>
        <span className='svg'>
          <FontAwesomeIcon icon={faMoon} />
        </span>

        {/* <FontAwesomeIcon icon={faMoon} className='fa-moon'/> */}
        <div className='ball'></div>
      </label>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          margin-top: 0.3rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }

        .checkbox {
          opacity: 0;
          position: absolute;
        }

        .label {
          background-color: rgb(77, 77, 77);
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px;
          position: relative;
          height: 26px;
          width: 50px;
          transform: scale(0.9); //taille du toggle
        }

        .label .ball {
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          height: 22px;
          width: 22px;
          transform: translateX(0px);
          transition: transform 0.2s linear;
        }

        .checkbox:checked + .label .ball {
          transform: translateX(24px);
          background-color: rgb(61, 228, 61);
        }
        .svg {
          font-size: 1rem;
          color: #f1c40f;
        }
      `}</style>
    </div>
  );
}
