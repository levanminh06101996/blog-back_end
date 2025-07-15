const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "minhlvf8196@fullstack.edu.vn",
    pass: "nsfk igid qeck dani",
  },
});

module.exports = transporter;
