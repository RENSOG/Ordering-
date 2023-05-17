const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer"); // Import nodemailer module
const messagebird = require('messagebird').initClient('PZVwDIPKlouu8815RYcfKqGO0')



app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON request bodies

app.post("/email", (req, res) => {
  const { cartItems, userDetails } = req.body;
  console.log(cartItems, userDetails);

  // Create the email message
  const message = `
    <h2>Order Details</h2>
    <p><strong>User:</strong> ${userDetails.name}</p>
    <p><strong>Address:</strong> ${userDetails.address}</p>
    <p><strong>Phone Number:</strong> ${userDetails.phoneNumber}</p>
    <p><strong>Email:</strong> ${userDetails.email}</p>
    <h3>Cart Items:</h3>
    <ul>
      ${cartItems
        .map(
          (item) => `
          <li>
            <p><strong>Item:</strong> ${item.name}</p>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
          </li>
        `
        )
        .join("")}
    </ul>
  `;

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "freshkiteksms@gmail.com",
      pass: "lnqerwaabbltdkiw",
    },
  });

  // Send the email
  const mailOptions = {
    from: "freshkiteksms@gmail.com",
    to: userDetails.email,
    subject: "New Food Order",
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed", error);
      res.status(500).send("Email sending failed");
    } else {
      console.log("Email sent successfully");
      res.status(200).send("Email sent successfully");
    }
  });

  
});

app.listen(2000, () => {
  console.log("Server Started On 2000");
});
