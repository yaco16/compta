import { useContext } from 'react';
import { UploadContext } from '../../context/uploadContext';
import Table from '../../components/GenerateGrid'

export default function Result() {
  const {upload} = useContext(UploadContext);

  let title;
  switch (upload.fileType) {
    case 'trial-balance':
    title = 'Balance';
      break;
    case `sales-journal`:
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
