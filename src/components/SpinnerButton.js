import { ImSpinner3 } from 'react-icons/im';

export default function SpinnerButton({loading}) {
  return (
    <>
      <button type='button' className={`button ${loading ? 'loading' : ''}`}>
        {!loading ? (
          <div className='button-text1'>Envoyer</div>
        ) : (
          <div className='container'>
            <div className='spinner'>{<ImSpinner3 color='white' size='22' />} </div>
            <div className='button-text2'>Chargement...</div>
          </div>
        )}
      </button>

      <style jsx>{`
        .button {
          width: 150px;
          height: 40px;
          position: relative;
          background-color: #04aa6d;
          border: none;
          outline: none;
          border-radius: 5px;
          cursor: pointer;
          padding: 0;
        }

        .button:hover {
          background-color: #028857;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-text1,
        .button-text2 {
          font-size: 1rem;
          color: white;
        }

        .button-text2 {
          padding-left: 0.5rem;
        }

        .spinner {
          animation: isLoading-spinner linear 4s infinite;
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
