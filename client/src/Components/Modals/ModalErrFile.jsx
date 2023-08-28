import React, { useEffect, useRef } from "react";
import { Button, Modal } from "@mui/material";

const ModalErrFile = ({ setOpenModalErrFile }) => {
  const divRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
    return () => {
      document.removeEventListener("click", handleClickOutSide, true);
    };
  }, []);

  const handleClickOutSide = (e) => {
    if (!divRef.current.contains(e.target)) {
      document.removeEventListener("click", handleClickOutSide, true);
      setOpenModalErrFile(false);
    }
  };

  return (
    <Modal open={true}>
      <div className="modal show fade d-block mt-2">
        <div className="modal-dialog model-border model-block" ref={divRef}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mt-1">Upload File</h4>
              <button
                className="btn-close"
                onClick={() => setOpenModalErrFile(false)}
              />
            </div>
            <div className="modal-body mt-2">
              <h5 className="mt-3">
                Attachment is allowed only for PDF files!
              </h5>
            </div>
            <div className="modal-footer mt-3">
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  float: "right",
                  marginRight: "5px",
                  marginTop: "7px",
                  marginBottom: "9px",
                  textTransform: "unset",
                  height: "36px",
                }}
                onClick={() => setOpenModalErrFile(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalErrFile;
