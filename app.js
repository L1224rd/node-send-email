const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.MY_HOST,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

app.get("/", (req, res) => {
  res.send("LISTENING ON PORT 3000");
});

app.post("/", (req, res) => {
  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: "eder.marques@citi.org.br",
    // to: "savio@simplesloja.com",
    subject: "Simples - Feira do Empreendedor",
    text: req.body.data
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    }
    res.send('ok');
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("READY");
});
