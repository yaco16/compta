import Image from 'next/image';
import { useState } from 'react';

{
  /* <Image
src={'/spinner.svg'}
alt={''}
width={30}
height={30}
/> */
}

export default function SpinnerButton() {
  const [isActive, setActive] = useState('false');

  return (
    <>
      <button type='button' className={`button ${isActive ? 'isLoading' : ''}`} onClick={() => setActive(!isActive)}>
        <span className='button-text'>Save changes</span>
      </button>
      <style jsx>{`
        .button {
          margin-top: 1rem;
          position: relative;
          padding: 1rem;
          background-color: #04aa6d;
          border: none;
          outline: none;
          border-radius: 2px;
          cursor: pointer;
        }

        .button:active {
          background: blue;
        }

        .button-text {
          font: bold 1rem;
          color: #ffffff;
          transition: all 0.2s;
        }

        .isLoading .button-text {
          visibility: hidden;
          opacity: 0;
        }

        .isLoading::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          border: 4px solid transparent;
          border-top-color: white;
          border-radius: 50%;
          animation: isLoading-spinner 1s linear infinite;
        }

        @keyframes isLoading-spinner {
          from {
            transform: rotate(0turn);
          }
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </>
  );
}
