const { Client } = require("../model");
const linkedinRegex = /https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
const idRegex = /\b\d{9}\b/g;
const phoneNumberRegex = /\b(\d{3}-\d{3}-\d{4}|\d{3}-\d{7}|\d{10})\b/g;

const linkedinMatch = (extractedText) => {
  const linkedin = extractedText.match(linkedinRegex)[0];
  return linkedin;
};

const emailMatch = (extractedText) => {
  const email = extractedText.match(emailRegex)[0];
  return email;
};

const idClientMatch = (extractedText) => {
  const idClient = extractedText.match(idRegex)[0];
  return idClient;
};

const phoneNumberMatch = (extractedText) => {
  const phoneNumber = extractedText.match(phoneNumberRegex)[0];
  return phoneNumber;
};

const nameMatch = (extractedText) => {
  const firstLine = extractedText.trim().split("\n")[0];
  const fullName = firstLine.replace(/([A-Z])/g, " $1").trim().split(/ (.*)/s);
  return fullName;
};

const createClient = async ( firstName, lastName, clientId, phoneNumber, linkedinUrl, email, file) => {
  const newClient = new Client({ firstName, lastName, clientId, phoneNumber, linkedinUrl, email, file});
  return newClient.save();
};

const deleteById = (id) => {
  return Client.findByIdAndDelete(id);
};

const findById = (id) => {
  return Client.findById(id);
};

module.exports = {
  linkedinMatch,
  emailMatch,
  idClientMatch,
  phoneNumberMatch,
  nameMatch,
  createClient,
  deleteById,
  findById,
};
