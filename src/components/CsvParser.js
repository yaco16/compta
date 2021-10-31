import React, { createRef, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { CSVReader } from 'react-papaparse';

import { UploadContext } from '../context/uploadContext';
import toast from './Toast'

const buttonRef = createRef();

export default function CSVReader1() {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const router = useRouter();
  const { upload, updateUpload } = useContext(UploadContext);

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  const handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  const handleOnFileLoad = (csvConverted) => {
    upload.csv = csvConverted;
  };

  const getFormEntries = async (event) => {
    event.preventDefault();
    upload.fileType = event.target.file.value; //on affecte le type de fichier dans upload

    event.target.action.value === 'db' ? (upload.importInDb = true) : (upload.importInDb = false); //si on choisit l'import en db, on affecte true dans import

    chooseAction(upload);
  };

  const chooseAction = function (upload) {
    switch (upload.importInDb) {
      case true:
        importInDb(upload);
        break;
      case false:
        updUploadContext(upload);
        openPageResults();
        break;
      default:
        break;
    }
  };

  const updUploadContext = function (upload) {
    updateUpload(upload); //MAJ du context
  };
  const openPageResults = function () {
    router.push('/dashboard/upload-result');
  };

  const importInDb = async (upload) => {
    const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/upload-tb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
      },
      body: JSON.stringify(upload.csv),
    });

    const response = await request.json();
    console.log('test3:', response);
    if (response.message === 'success') {
      notify("success", "Import effectué!")
    } else {
      notify("error", "Echec!")
    }
  };

  return (
    <>
      <div className='container'>
        <div className='chooseFile'>
          <div>Sélectionner le fichier à importer :</div>
          <CSVReader ref={buttonRef} onFileLoad={handleOnFileLoad} onError={handleOnError} noClick noDrag onRemoveFile={handleOnRemoveFile}>
            {({ file }) => (
              <>
                <button className='button_browse' type='button' onClick={handleOpenDialog}>
                  Choisir le fichier
                </button>
                <div>Fichier sélectionné : </div>
                <div className='fileName'>{file && file.name}</div>
                <button className='button_remove' onClick={handleRemoveFile}>
                  Supprimer
                </button>
              </>
            )}
          </CSVReader>
        </div>
        <div>
          <div className='subtitle'>Type de fichier :</div>
          <form onSubmit={getFormEntries}>
            <div>
              <input type='radio' name='file' value='tb' id='tb' />
              <label htmlFor='tb'>Balance générale (csv)</label>
            </div>
            <div>
              <input type='radio' name='file' value='clients-gl' id='clients-gl' />
              <label htmlFor='clients-gl'>GL clients (csv)</label>
            </div>
            <br />
            <br />
            <div className='subtitle'>Type de fichier :</div>
            <div>
              <div>
                <input type='radio' id='tab' name='action' value='tab'></input>
                <label htmlFor='tab'> Ouvrir dans un nouvel onglet</label>
              </div>
              <div>
                <input type='radio' id='db' name='action' value='db'></input>
                <label htmlFor='db'> Importer en base de données</label>
              </div>
            </div>
            <div className='container-sendForm'>
              <button className='submitBtn' name='tab'>
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-around;
        }
        .button_browse,
        .fileName,
        .button_remove {
          border: none;
          margin: 1rem 0 1rem 1rem;
        }

        .button_browse,
        .button_remove {
          padding: 0.5rem;
          cursor: pointer;
        }

        .button_browse {
          background-color: #4b91c9;
          color: white;
        }

        .button_remove {
          background-color: #dd2222;
          color: white;
        }

        label {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .subtitle {
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        .container-sendForm {
          display: flex;
          justify-content: center;
        }

        .submitBtn {
          display: block;
          color: white;
          font-size: 1rem;
          background-color: rgb(34, 194, 34);
          border: none;
          border-radius: 15px;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
