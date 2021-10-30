import React, { createContext, useState } from 'react';

export const UploadContext = createContext();

const defaultUpload = {
  csv: '',
  fileType: '',
};


export default function UploadContextProvider({ children }) {
  const [upload, setUpload] = useState(defaultUpload);
  const updateUpload = (data) => {
    setUpload(data);
  };
  return <UploadContext.Provider value={{ upload, updateUpload }}>{children}</UploadContext.Provider>;
}
