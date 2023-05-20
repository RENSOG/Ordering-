const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer"); // Import nodemailer module
const Register = require("./Models/Register");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const mongoose = require("mongoose");
const secretKey = process.env.jwtkey;
app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON request bodies

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://freshkiteksms:12345678s@cluster0.pr8tqcg.mongodb.net/Order?retryWrites=true&w=majority");
    console.log("Connected to mongoDB."); 
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!"); 
  console.log("cloud mongodb disconnected try again");
});

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
  connect();
});

app.post("/register", (req, res) => {
  const registrationData = req.body;

  // Hash the password
  bcrypt.hash(registrationData.password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Create a new instance of the Register model
    const register = new Register({
      username: registrationData.username,
      email: registrationData.email,
      password: hashedPassword,
    });
    console.log(register);
    // Save the registration data to the database
    register
      .save()
      .then(() => {
        // Generate a JWT token
       

        // Return the token to the client
        res.status(200).json("Successfully created");
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await Register.findOne({ username });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey);

    // Redirect to the dashboard or return the token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = username;
    next();
  });
};

app.get('/food', authenticateToken, (req, res) => {
  // Only authenticated users can access this route
  // Handle the request for the "food" page here
});