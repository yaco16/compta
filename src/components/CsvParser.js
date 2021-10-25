import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import Table from './GenerateGrid';
import convertCsvBgToInsertIntoDb from '../services/bgToDb';

const buttonRef = React.createRef();

export default class CSVReader1 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (csvConvertedData) => {
    if (csvConvertedData) {
      this.setState({ data: csvConvertedData });
    } else {
      throw new Error();
    }
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
    const csvConvertedData = this.state.data;
    const test = await convertCsvBgToInsertIntoDb(csvConvertedData);
    // console.log('test:', test);
    const test2 = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/importbg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //il faut préciser ce contenu pour que le fichier soit envoyé au bon format
      },
      body: JSON.stringify(test),
    });
    const test3 = await test2.json();
    console.log('test3:', test3);




  }

  render() {
    const csvConvertedData = this.state.data;
    // let table;
    if (csvConvertedData) {
      // table = <Table data={csvConvertedData} />; //en commentaire provisoire
      this.getData(csvConvertedData)
    }
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside>
              <button className='button_browse' type='button' onClick={this.handleOpenDialog}>
                Choisir un fichier
              </button>
              <div className='fileName'>{file && file.name}</div>
              <button className='button_remove' onClick={this.handleRemoveFile}>
                Supprimer
              </button>
            </aside>
          )}
        </CSVReader>
        {/* affichage du tableau si aucun erreur */}
        {/* {table} */}
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
