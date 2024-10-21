import React, { useState } from "react";
import { FileDrop } from 'react-file-drop';

function FileUpload({ onFileUpload }) {
  const [fileName, setFileName] = useState("");

  const handleFileDrop = (files) => {
    const file = files[0];
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    onFileUpload(formData);
  };

  return (
    <div className="file-drop-container">
      <FileDrop onDrop={(files) => handleFileDrop(files)}>
        {fileName ? fileName : "Drag and drop a file here or click to upload"}
      </FileDrop>
    </div>
  );
}

export default FileUpload;
