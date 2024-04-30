const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const dotenv = require("dotenv");
const express = require("express");
const EmailTemplate = require("./EmailTemplate");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const ClientTemplate = require("./ClientTemplate");

dotenv.config();
admin.initializeApp();

const app = express();
app.use(cors);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  return response.status(200).json({ msg: "hello World" });
});

app.post("/send-email", async (req, res) => {
  try {
    const { userName, conditionsValues, trialOptionsValues, email } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: '"Clerkenwell Bio Centre" <nathandc90@gmail.com>', // sender address
      // to: "anasnadeem200406@gmail.com", // list of receivers
      // to: "nathandc90@gmail.com",
      to: "waseelfawad@gmail.com",
      subject: "Interested Buyer", // Subject line
      text: "Greetings ! You have a new interested Buyer for tickets", // plain text body
      html: EmailTemplate(
        userName,
        conditionsValues,
        trialOptionsValues,
        email
      ), // html body
    });
    res.status(200).json({
      msg: `Message sent successfully ${info.messageId}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register-user", async (req, res) => {
  try {
    const {
      selectedTrialOption: selectedSlot,
      email,
      expiryDateTime,
      code,
      price,
    } = req.body;

    // Create a user object
    const user = {
      selectedSlot,
      email,
      expiryDateTime,
      code,
      price,
    };

    // Save user data to Firestore and get the document reference
    const docRef = await admin.firestore().collection("users").add(user);
    const userId = docRef.id; // Get the ID of the newly created document
    if (userId) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_MAILER_EMAIL,
          pass: process.env.NODE_MAILER_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: '"Clerkenwell Bio Centre" <nathandc90@gmail.com>', // sender address
        to: email,
        subject: "Your Ticket Booking Details", // Subject line
        text: "Greetings ! Congratulations you have been able to reserve your spot", // plain text body
        html: ClientTemplate(selectedSlot, code, expiryDateTime, email, userId), // html body
      });
      // Send a success response
      res.status(200).json({ msg: `User registered successfully${userId}` });
    }
  } catch (err) {
    console.error("Error:", err);
    // Send an error response
    res.status(500).send("Internal Server Error");
  }
});

app.post("/validate-code", async (req, res) => {
  try {
    const { userId, code } = req.body;
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    if (userSnapshot.exists) {
      const userData = userSnapshot.data();
      if (userData.code === code) {
        const expiryDateTimeUTC = new Date(userData.expiryDateTime);
        if (expiryDateTimeUTC > new Date()) {
          res.status(200).json({ message: "User is authorized", userData });
        } else {
          res.status(401).json({ error: "Code has expired" });
        }
      } else {
        res.status(401).json({ error: "Invalid code" });
      }
    } else {
      res.status(404).json({ error: "User with this userId not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    // Send an error response
    res.status(500).send("Internal Server Error");
  }
});

exports.app = functions.https.onRequest(app);
