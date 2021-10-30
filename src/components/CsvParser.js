import React, { useState, createRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { CSVReader } from 'react-papaparse';

import Table from './GenerateGrid';
import { UploadContext } from '../context/uploadContext';

const buttonRef = createRef();

export default function CSVReader1() {
  const router = useRouter();
  const { upload, updateUpload } = useContext(UploadContext);

  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (csvConverted) => {
    upload.csv = csvConverted;
  };

  const registerUser = async (event) => {
    event.preventDefault();
    upload.fileType = event.target.file.value;
    updUploadContext(upload);
  };

  const updUploadContext = function (data) {
    updateUpload(data);
    openPageResults();
  };

  const openPageResults = function () {
    router.push('/dashboard/upload-result');
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

  const getData = async () => {
    const csvConverted = this.state.data;

    const request = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/upload-tb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
      },
      body: JSON.stringify(csvConverted),
    });

    const response = await request.json();
    console.log('test3:', response);
  };

  return (
    <>
      <legend>Sélectionner le type de fichier à importer :</legend>
      <CSVReader ref={buttonRef} onFileLoad={handleOnFileLoad} onError={handleOnError} noClick noDrag onRemoveFile={handleOnRemoveFile}>
        {({ file }) => (
          <>
            <aside>
              <button className='button_browse' type='button' onClick={handleOpenDialog}>
                Choisir le fichier
              </button>
              <div className='fileName'>{file && file.name}</div>
              <button className='button_remove' onClick={handleRemoveFile}>
                Supprimer
              </button>
            </aside>
          </>
        )}
      </CSVReader>
      <form onSubmit={registerUser}>
        <div>
          <input type='radio' name='file' value='tb' id='' />
          <label htmlFor='tb'>Balance générale (csv)</label>
        </div>
        <div>
          <input type='radio' name='file' value='clients-gl' id='' />
          <label htmlFor='clients-gl'>GL clients (csv)</label>
        </div>
        <button>Envoyer</button>
      </form>
      <style jsx>{`
        body {
          height: 100vh;
        }
        aside {
          display: flex;
          flex-direction: row;
          margin-bottom: 10;
        }

        .button_browse {
          width: 10%;
          background-color: #4b91c9;
          color: white;
          border-radius: 0;
          margin-left: 0;
          margin-right: 0;
          padding-left: 0;
          padding-right: 0;
        }

        .fileName {
          width: 20%;
          border-width: 1;
          border-style: solid;
          border-color: rgb(172, 164, 164);
          height: 45;
          line-height: 2.5;
          margin-top: 5;
          margin-bottom: 5;
          padding-left: 13;
          padding-top: 3;
        }

        .button_remove {
          background-color: #dd2222;
          color: white;
          border-radius: 0;
          margin: 0 0 20 20;
        }
      `}</style>
    </>
  );
}
