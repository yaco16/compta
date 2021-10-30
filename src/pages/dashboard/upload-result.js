import { useContext } from 'react';
import { UploadContext } from '../../context/uploadContext';
import GenerateGrid from '../../components/GenerateGrid';

export default function Result() {
  const {upload} = useContext(UploadContext)
  console.log('upload:', upload);

    // let table;
  // table = <Table data={csvConvertedData} />; //en commentaire provisoire
  // this.getData(csvConvertedData);

  return (
    <div>
      <h1>Result : Hello</h1>
    </div>
  );
}
