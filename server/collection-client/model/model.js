const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  clientId: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  linkedinUrl: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  file: {
    type: Object,
    required: true,
  },
});

const Client = mongoose.model("clients", clientSchema);

module.exports = {
  Client,
};
