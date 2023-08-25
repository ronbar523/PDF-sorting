import React, { useEffect, useState } from "react";
import { uploadFile } from "../Services/FileService/FileService";

const HomePage = () => {
  const [file, setFile] = useState({});

  const onFileChange = (e) => {
    try {
      // setIsLoadingPhoto(true);
      const file = e.target.files[0];
      if (file.name !== undefined) {
        const formData = new FormData();
        formData.append("file", file);
        const fetchData = async () => {
          try {
            await uploadFile(formData).then((res) => {
              setFile(res.data);
              console.log(res.data);
            });
          } catch (err) {
            //   window.location.reload();
          }
        };
        fetchData().catch(console.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <>
      <input
        className="modalMediaPostInput"
        type="file"
        accept=".pdf"
        onChange={(e) => {
          onFileChange(e);
          e.target.value = null;
        }}

        // ref={inputRef}
      />

      <button to={file} target="_blank" download>
        Download
      </button>
    </>
  );
};

export default HomePage;
