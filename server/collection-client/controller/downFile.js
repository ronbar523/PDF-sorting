const ClientModel = require("../model/functions/functions");

const downFile = async (req, res) => {
  try {
    const pdf = await ClientModel.findById(req.params.id);

    if (!pdf) {
      return res.status(404).send("PDF not found");
    }

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdf.file.filename}.pdf`
    );

    // Send the PDF buffer as the response
    const pdfBuffer = Buffer.from(pdf.file.data.buffer);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  downFile,
};
