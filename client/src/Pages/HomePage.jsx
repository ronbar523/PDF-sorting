import React, { useState } from "react";
import ApplyResume from "../Components/HomePage/ApplyResume";
import ShowResume from "../Components/HomePage/ShowResume";

const ViewPdf2 = () => {
  const [pdfDetails, setPdfDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {!showDetails ? (
        <ApplyResume
          setPdfDetails={setPdfDetails}
          setShowDetails={setShowDetails}
        />
      ) : (
        <ShowResume
          pdfDetails={pdfDetails}
          setPdfDetails={setPdfDetails}
          setShowDetails={setShowDetails}
        />
      )}
    </>
  );
};

export default ViewPdf2;
