import { useContext } from 'react';
import { UploadContext } from '../../context/uploadContext';
import Table from '../../components/GenerateGrid'

export default function Result() {
  const {upload} = useContext(UploadContext);
  console.log('upload:', upload);

  let title;
  switch (upload.fileType) {
    case 'tb':
    title = 'Balance';
      break;
    case `clients-gl`:
      title = 'Grand-livre clients';

    default:
      break;
  }

  return (
    <div>
      <h1>Résultat : {title} au {upload.date}</h1>
      <Table data={upload.csv} />    </div>
  );
}
