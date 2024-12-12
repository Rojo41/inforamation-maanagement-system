const Accounts = require("../models/accountsModel");
const Student = require("../models/studentModel");
const Requirement = require("../models/requirementsModel");
const Semester = require("../models/schoolYearModel");
const getDashboard = async (req, res) => {
  try {
    const semester = await Semester.find()
      .sort({ createdAt: -1 })
      .populate("students");
    const students = semester[0].students;
    console.log(students);
    const accounts = await Accounts.find({ role: "officer" });
    const requirement = await Requirement.find();

    if (students && accounts && requirement) {
      data = { students, accounts, requirement };
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No data found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const getEnrollmentOfficer = async (req, res) => {
  const role = req.user.role;
  if (role === "officer") {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  try {
    const officers = await Accounts.find({ role: "officer", isActive: true });
    res.status(200).json(officers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateReport = (req, res) => {
  res.send(console.log("Generate Report"));
};

module.exports = { getDashboard, getEnrollmentOfficer, generateReport };
