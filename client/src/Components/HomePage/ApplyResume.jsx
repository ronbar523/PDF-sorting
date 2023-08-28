import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../../Services/FileService/FileService";
import ModalErrFile from "../Modals/ModalErrFile";
import ModalErrDetails from "../Modals/ModalErrDetails";

const ApplyResume = ({ setShowDetails, setPdfDetails }) => {
  const inputRef = useRef();
  const [openModalerrFile, setOpenModalErrFile] = useState(false);
  const [openModalErrDetails, setOpenModalErrDetails] = useState(false);

  const uploadPdf = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      await uploadFile(formData).then((res) => {
        setPdfDetails(res.data.client);
        setShowDetails(true);
      });
      toast.success("Your resume has been received.", { autoClose: 2500 })
      // toast.('Failed to delete PDF.');
    } catch (err) {
      if (err.response.status === 500) {
        // The file it's not PDF
        setOpenModalErrFile(true);
      } else {
        // Data is missing in PDF
        setOpenModalErrDetails(true);
      }
    }
  };

  return (
    <>
      <div className="apply-page">
        <header className="header mt-2">
          <h1>Apply Only With Resume</h1>
        </header>
        <main className="main-content">
          <div className="upload-form">
            <label>Upload your resume:</label>
            <input
              className="input-upload-pdf"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                uploadPdf(e);
                e.target.value = null;
              }}
              ref={inputRef}
            />
            <button onClick={() => inputRef.current.click()}>Upload</button>
          </div>
          <p className="instructions">
            Please upload your resume in PDF format.
          </p>
        </main>
      </div>

      {openModalerrFile ? (
        <ModalErrFile setOpenModalErrFile={setOpenModalErrFile} />
      ) : null}

      {openModalErrDetails ? (
        <ModalErrDetails setOpenModalErrDetails={setOpenModalErrDetails} />
      ) : null}
    </>
  );
};

export default ApplyResume;
