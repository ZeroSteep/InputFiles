import React, { useState, useCallback } from "react";
import { Input } from "./components/Input";
import { Preview } from "./components/Preview";

import "./App.css";
import "./style.scss";

function App() {
  const [files, setFiles] = useState([]);

  const handleChange = useCallback((e) => {
    if (!e.target.files.length) {
      return;
    }

    const newFiles = Array.from(e.target.files)
    .filter((file) => file.type.match("image"))
    .map((file) => {
      const { name, size, type } = file;

      return { src: URL.createObjectURL(file), name, size, type }
    });

    setFiles(newFiles);
  }, []);

  const handleRemove = (index) => {
    const newFiles = [...files];

    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = (files) => {
    console.log(files);
  };

  return (
    <div className="App">
      <div className="container">
        <label className="label_btn">
          Открыть
          <Input
            onChange={handleChange}
            accept=".png,.jpeg,.jpg,.gif"
            multiple
          />
        </label>

        {files.length ? (
          <button onClick={() => handleUpload(files)} className="btn download">
            Загрузить
          </button>
        ) : null}

        <div className="preview">
          <Preview files={files} onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default App;
