/* eslint-disable react/no-unescaped-entities */
import React, { createRef, useContext, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CSVReader } from 'react-papaparse';

import { UploadContext } from '../../../context/uploadContext';
import toast from '../../../components/Toast';
import { importInDb } from '../../../services/queries';

// import Spinner from '../../../components/Spinner';
import NProgress from 'nprogress';
import SpinnerButton from '../../../components/SpinnerButton';

const buttonRef = createRef();

export default function UploadFile() {
  const router = useRouter();
  const { upload, updateUpload } = useContext(UploadContext);
  const [loading, setLoading] = useState(false);

  //création de la date du jour pour remplir l'input date
  const today = new Date().toLocaleDateString().split('/').reverse().join('-').toString();

  //gestion des messages Toast
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const handleOpenDialog = (event) => {
    if (buttonRef.current) {
      buttonRef.current.open(event);
    }
  };

  const handleOnError = (error, file, inputElem, reason) => {
    console.log(error);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  const handleRemoveFile = (event) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(event);
    }
  };

  //ajout du fichier csv au context
  const handleOnFileLoad = (csvConverted) => {
    upload.csv = csvConverted;
  };

  //ajout des données du formulaire au context
  const getFormEntries = async (event) => {
    event.preventDefault();

    //Afficher les messages d'errur si le formulaire envoyé n'est pas complet
    if (!upload.csv) {
      notify('error', 'Veuillez sélectionner un fichier');
    }

    if (!event.target.file.value) {
      notify('error', 'Le type de fichier est obligatoire');
    } else {
      upload.fileType = event.target.file.value; //on affecte le type de fichier dans upload
    }

    if (!event.target.fiscal_year.value) {
      notify('error', "L'exercice fiscal est obligatoire");
    } else {
      upload.fiscal_year = event.target.fiscal_year.value; //on affecte le type de fichier dans upload
    }

    if (!event.target.action.value) {
      notify('error', "L'action à effectuer est obligatoire");
    } else {
      event.target.action.value === 'db' ? (upload.importInDb = true) : (upload.importInDb = false); //si on choisit l'import en db, on affecte true dans import
    }

    //transformation de la date en format français
    const date = event.target.date.value;
    const dateFr = date.split('-').reverse().join('/');
    upload.date = dateFr;

    //si les 4 1res conditions sont remplies, on envoie le fichier
    //la date reste facultative
    if (event.target.file.value && event.target.fiscal_year.value && event.target.action.value && upload.csv) {
      chooseAction(upload);
    }
  };

  //permet de choisir si on ouvre le csv dans un nouvel onglet
  //ou si on importe en DB
  const chooseAction = function (upload) {
    switch (upload.importInDb) {
      case true:
        uploadToDb(upload);
        break;
      case false:
        //le contexte est MAJ uniquement si on ouvre un nouvel onglet
        // => inutile de MAJ le contexte si on importe en DB
        upload.loading = true;
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

  // ouverture du csv dans un nouvel onglet
  const openPageResults = function () {
    router.push('/dashboard/tools/upload-result');
  };

  //import en DB : sélection de la query
  const uploadToDb = async function (upload) {
    setLoading(true);
    NProgress.start();
    const request = await importInDb(upload);
    const response = await request.json();
    NProgress.done();
    setLoading(false);
    if (response.message === 'success') {
      notify('success', `Succès : ${response.data} lignes insérées`);
    } else {
      notify('error', 'Echec !');
    }
  };

  return (
    <>
      <h1>Importer un fichier</h1>
      <div className='container-2-colums'>
        <div className='chooseFile'>
          <div>Sélectionner le fichier à importer :</div>
          <CSVReader ref={buttonRef} onFileLoad={handleOnFileLoad} onError={handleOnError} noClick noDrag onRemoveFile={handleOnRemoveFile}>
            {({ file }) => (
              <>
                <button className='button_browse' type='button' onClick={handleOpenDialog}>
                  Choisir le fichier
                </button>
                {file && (
                  <>
                    <div>Fichier sélectionné : </div>
                    <div className='fileName'>{file && file.name}</div>
                    <button className='button_remove' onClick={handleRemoveFile}>
                      Supprimer
                    </button>
                  </>
                )}
              </>
            )}
          </CSVReader>
        </div>
        <div>
          <form onSubmit={getFormEntries}>
            <div className='subtitle-container'>
              <div className='form-subtitle'>Type de fichier :</div>
              <div>
                <input type='radio' name='file' value='trial-balance' id='trial-balance' />
                <label htmlFor='trial-balance'>Balance générale (csv)</label>
              </div>
              <div>
                <input type='radio' name='file' value='sales-journal' id='sales-journal' />
                <label htmlFor='sales-journal'>Journal des ventes (csv)</label>
                <select name='fiscal_year' id='select-fiscal_year' defaultValue=''>
                  <option value='' disabled>
                    --Choisir l'exercice fiscal--
                  </option>
                  <option value='2021-2022'>2021-2022</option>
                  <option value='2020-2021'>2020-2021</option>
                  <option value='2019-2020'>2019-2020</option>
                </select>
              </div>
              <div>
                <input type='radio' name='file' value='purchases-journal' id='purchases-journal' />
                <label htmlFor='purchases-journal'>Journal des achats (csv)</label>
              </div>
              <div>
                <input type='radio' name='file' value='OD-journal' id='OD-journal' />
                <label htmlFor='OD-journal'>Journal des OD (csv)</label>
              </div>
            </div>

            <div className='subtitle-container'>
              <div className='form-subtitle'>Action à effectuer :</div>
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
            </div>

            <div className='subtitle-container'>
              <div className='form-subtitle'>Date du document :</div>
              <input type='date' name='date' id='form-date' defaultValue={today} />
            </div>

              <button className='submitBtn'>
                <SpinnerButton loading={loading ? true : false} />
              </button>
          </form>
        </div>
        <style jsx>{`
          .container-2-colums {
            display: flex;
            justify-content: space-around;
            padding-left: 4rem;
            padding-right: 4rem;
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

          .fileName {
            display: inline;
          }

          label {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
          }

          .subtitle-container {
            margin-bottom: 1rem;
          }
          .form-subtitle {
            font-weight: bold;
            margin-bottom: 0.3rem;
          }

          .submitBtn {
            border: none;
            padding: 0;
          }
        `}</style>
      </div>
    </>
  );
}
