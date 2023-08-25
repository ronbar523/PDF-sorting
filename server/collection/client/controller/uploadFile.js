const pdf = require("pdf-parse");

const linkedinRegex = /https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const idRegex = /\b\d{9}\b/g;
const phoneNumberRegex = /\b(\d{3}-\d{3}-\d{4}|\d{10})\b/g;

const uploadFile = async (req, res) => {
  try {
    if (req.file) {
      const pdfBuffer = req.file.buffer; // file buffer

      // use the pdfBuffer for PDF processing, such as text extraction By pdf-parse.
      const data = await pdf(pdfBuffer);
      const extractedText = data.text;

      const clientDetails = { firstName: "", lastName: "", id: "", email: "", phoneNumber: "", linkedinUrl: "", linkedinUser: "" };

      // Search for the LinkedIn URL in the text
      const linkedinMatch = extractedText.match(linkedinRegex);
      clientDetails.linkedinUrl = linkedinMatch[0];
      clientDetails.linkedinUser = linkedinMatch[1];

      // Search id && email && phoneNumber
      clientDetails.email = extractedText.match(emailRegex)[0];
      clientDetails.id = extractedText.match(idRegex)[0];
      clientDetails.phoneNumber = extractedText.match(phoneNumberRegex)[0];

      const firstLine = extractedText.trim().split("\n")[0];
      const fullName = firstLine.replace(/([A-Z])/g, " $1").trim().split(/ (.*)/s);

      clientDetails.firstName = fullName[0];
      clientDetails.lastName = fullName[1];

      res.json({
        status: 200,
        clientDetails: clientDetails,
      });
    } else {
      return res.status(400).json({ status: 400, error: "No file uploaded." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, error: err.message });
  }
};

module.exports = {
  uploadFile,
};
