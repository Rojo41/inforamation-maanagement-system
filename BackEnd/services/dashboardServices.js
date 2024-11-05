const Accounts = require("../models/accountsModel");
const getDashboard = (req, res) => {
  res.send(console.log("In the dashboard"));
};
const getEnrollmentOfficer = async (req, res) => {
  try {
    const officers = await Accounts.find();
    res.status(200).json(officers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const generateReport = (req, res) => {
  res.send(console.log("Generate Report"));
};

module.exports = { getDashboard, getEnrollmentOfficer, generateReport };
