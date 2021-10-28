import { useContext, createContext } from 'react';

export const uploadContext = createContext();

export default function FileType() {
  const registerUser = async (event) => {
    event.preventDefault();
    uploadContext.fileType = event.target.file.value;
    console.log('uploadContext:', uploadContext.fileType);
  };

  return (
    <div>
      <legend>Sélectionner le type de fichier à importer :</legend>
      <form onSubmit={registerUser}>
        <div>
          <input type='radio' name='file' value='tb' id='' />
          <label htmlFor='tb'>Balance générale (csv)</label>
        </div>
        <div>
          <input type='radio' name='file' value='clients-gl' id='' />
          <label htmlFor='clients-gl'>GL clients (csv)</label>
        </div>
      </form>
    </div>
  );
}
