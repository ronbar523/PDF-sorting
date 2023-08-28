const pdf = require("pdf-parse");
const ClientModel = require("../model/functions/functions");

const uploadFile = async (req, res) => {
  try {
    if (req.file) {
      const pdfBuffer = req.file.buffer;

      // Extract text from the PDF
      const data = await pdf(pdfBuffer);

      // use the pdfBuffer for PDF processing, such as text extraction By pdf-parse.
      const extractedText = data.text;

      const pdfDocument = {
        data: pdfBuffer,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      };

      const clientDetails = {
        firstName: "",
        lastName: "",
        id: "",
        email: "",
        phoneNumber: "",
        linkedinUrl: "",
        linkedinUser: "",
      };

      clientDetails.linkedinUrl = ClientModel.linkedinMatch(extractedText);
      clientDetails.email = ClientModel.emailMatch(extractedText);

      clientDetails.clientId = ClientModel.idClientMatch(extractedText);
      clientDetails.phoneNumber = ClientModel.phoneNumberMatch(extractedText);

      const fullName = ClientModel.nameMatch(extractedText);
      clientDetails.firstName = fullName[0];
      clientDetails.lastName = fullName[1];

      const client = await ClientModel.createClient(
        clientDetails.firstName,
        clientDetails.lastName,
        clientDetails.clientId,
        clientDetails.phoneNumber,
        clientDetails.linkedinUrl,
        clientDetails.email,
        pdfDocument
      );

      res.json({
        status: 200,
        client: client,
      });
    } else {
      return res.status(400).json({ status: 400, error: "No file uploaded." });
    }
  } catch (err) {
    res.status(400).json({ status: 400, error: err.message });
  }
};

module.exports = {
  uploadFile,
};
