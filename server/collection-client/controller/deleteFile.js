const ClientModel = require("../model/functions/functions");

const removeFile = async (req, res) => {
  try {
    const { id } = req.params;
    await ClientModel.deleteById(id);
    res.json({ msg: "details deleted" });
  } catch (err) {
    res.status(400).json({ status: 400, error: err });
  }
};
module.exports = {
  removeFile,
};
