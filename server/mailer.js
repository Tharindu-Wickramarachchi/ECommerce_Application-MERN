// Import the required packages
require("dotenv").config(); // Load environment variables from .env
const nodemailer = require("nodemailer");

// Generate a random OTP code (4 digits)
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
}

// Generate the OTP code
const otpCode = generateOTP();

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Use the EMAIL_USER from .env
    pass: process.env.EMAIL_PASSWORD, // Use the EMAIL_PASSWORD from .env
  },
});

// Configure the mail options
const mailOptions = {
  from: {
    name: "ECommerce_Application-MERN",
    address: process.env.EMAIL_USER, // Use the email from .env
  },
  to: "tharinduwick2002@gmail.com", // Your recipient email
  subject: "Email Verification Code",
  html: `
    <div style="
    font-family: Arial, 
    sans-serif; 
    text-align: center; 
    padding: 20px;
    border: 1px solid black; 
    border-radius: 5px; 
    max-width: 400px; 
    margin: 20px auto; /* Center the div */
    background-color: white; /* Optional: add a background color */
    ">
    
    <img src="https://drive.google.com/uc?id=197M05EbsqbQWoSwedmmICpTDtjKl4FIl" 
         alt="OTP Icon" 
         style="width: 50px; height: auto; margin-bottom: 20px;" />
    
    <p style="font-size: 22px; color: #00ccff; font-weight: bold;">Your One-Time Password (OTP)</p>
    <p style="font-size: 16px; color: black;">
        Your OTP code is: 
        <span style="font-size: 20px; color: red; font-weight: bold;">${otpCode}</span>
    </p>
    <p style="font-size: 16px; color: black;">
        Please use this code to verify your identity. It is valid for a short period.
    </p>
    <p style="font-size: 16px; color: black;">
        Thank you!
    </p>
    </div>
    `,
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log("Error: " + error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
