import React, { Component, useContext, createContext } from 'react';
import { CSVReader } from 'react-papaparse';
import Table from './GenerateGrid';
// import FileType, { uploadContext } from './upload/FileType';

const buttonRef = React.createRef();
// export const uploadContext = createContext();

export default class CSVReader1 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.upload = {};
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  registerUser = (event) => {
    event.preventDefault();
    this.upload.fileType = event.target.file.value;
    console.log(this.upload);
  };

  handleOnFileLoad = (csvConverted) => {
    this.upload.csv = csvConverted;
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  getData = async () => {
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

  render() {
    // const csvConvertedData = this.state.data;
    // let table;
    // if (csvConvertedData) {
    // table = <Table data={csvConvertedData} />; //en commentaire provisoire
    // this.getData(csvConvertedData);
    // }

    return (
      <>
        <legend>Sélectionner le type de fichier à importer :</legend>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <>
              <aside>
                <button className='button_browse' type='button' onClick={this.handleOpenDialog}>
                  Choisir le fichier
                </button>
                <div className='fileName'>{file && file.name}</div>
                <button className='button_remove' onClick={this.handleRemoveFile}>
                  Supprimer
                </button>
              </aside>
            </>
          )}
        </CSVReader>
        <form onSubmit={this.registerUser}>
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
}
