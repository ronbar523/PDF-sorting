import React from "react";
import { toast } from "react-toastify";
import { removeFile } from "../../Services/FileService/FileService";
const URL = process.env.REACT_APP_SERVER_URL;

const ShowResume = ({ pdfDetails, setPdfDetails, setShowDetails }) => {

  const deletePdf = async () => {
    try {
      const id = pdfDetails._id;
      await removeFile(id);
      toast.success("Your resume has been deleted.", { autoClose: 2500 })
      setPdfDetails({});
      setShowDetails(false);
      

    } catch {
      toast.error('Failed to delete PDF.', { autoClose: 2500 });
    }
  };

  const downloadPdf = async () => {
    try {
      // Make a GET request to the server endpoint that serves the PDF
      const response = await fetch(
        `${URL}/client/download-file/${pdfDetails._id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status} status`);
      }

      // Extract the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "download.pdf";

      // Create a blob from the response data
      const blob = await response.blob();

      // Create a URL htmlFor the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      // Trigger a click event to download the file
      a.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch  {
      toast.error('Failed to download PDF.', { autoClose: 2500 });
    }
  };

  return (
    <>
      <div className="div-resume-container">
        <div className="resume-container">
          <h1 className="title-container">Resume Successfully Saved</h1>
          <div className="input-container">
            <label htmlFor="firstName">First Name:</label>
            <input defaultValue={pdfDetails.firstName} type="text" id="firstName" name="firstName"
            />
          </div>

          <div className="input-container">
            <label htmlFor="lastName">Last Name:</label>
            <input defaultValue={pdfDetails.lastName} type="text" id="lastName" name="lastName"
            />
          </div>

          <div className="input-container">
            <label htmlFor="phone">Phone Number:</label>
            <input defaultValue={pdfDetails.phoneNumber} type="tel" id="phone" name="phone"
            />
          </div>

          <div className="input-container">
            <label htmlFor="clientID">ID:</label>
            <input defaultValue={pdfDetails.clientId} type="text" id="clientID" name="clientID"
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">email:</label>
            <input defaultValue={pdfDetails.email} type="email" id="email" name="email"
            />
          </div>

          <div className="input-container">
            <label htmlFor="linkedinUrl">linkedinUrl:</label>
            <input defaultValue={pdfDetails.linkedinUrl} type="text" id="linkedinUrl" name="linkedinUrl"
            />
          </div>

          <button className="download-button" onClick={() => downloadPdf()}>
            Download PDF
          </button>
          <button className="delete-button" onClick={() => deletePdf()}>
            Delete PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowResume;
