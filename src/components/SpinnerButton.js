import Image from 'next/image';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ImSpinner3 } from 'react-icons/im';

export default function SpinnerButton() {
  const [isActive, setActive] = useState('false');

  return (
    <>
      <button type='button' className={`button ${isActive ? 'isLoading' : ''}`} onClick={() => setActive(!isActive)}>
        <div className='container'>
          {!isActive ? (
            <div className='button-text'>Save changes</div>
          ) : (
            <>
              <div className='spinner'>{<ImSpinner3 color='white' size='22' />} </div>
              <div className='button-text'>Saving...</div>
            </>
          )}
        </div>
      </button>

      <style jsx>{`
        .button {
          width: 150px;
          height: 40px;
          margin-top: 1rem;
          position: relative;
          padding: 0.5rem;
          background-color: #04aa6d;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #028857;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s 0.1s ease-in-out;
        }

        .button-text {
          font-size: 1rem;
          padding-left: 0.5rem;
          color: white;
        }

        .spinner {
          animation: isLoading-spinner linear 3s infinite;
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
