const nodemailer = require('nodemailer');


 const Email =(req, res) => {
    const { cartItems, user } = req.body;
  
    // Create the email message
    const message = `
      <h2>Order Details</h2>
      <p><strong>User:</strong> ${user.name}</p>
      <p><strong>Address:</strong> ${user.address}</p>
      <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
      <p><strong>Phone Number:</strong> ${user.email}</p>
      <h3>Cart Items:</h3>
      <ul>
        ${cartItems.map(item => `
          <li>
            <p><strong>Item:</strong> ${item.name}</p>
            <p><strong>Price:</strong> $${item.price}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
          </li>
        `).join('')}
      </ul>
    `;
  
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'smtp.gmail.com',
      port: 465,
      secure:true,
      auth: {
        user: 'freshkiteksms@gmail.com',
        pass: 'lnqerwaabbltdkiw',
      },
    });
  
    // Send the email
    const mailOptions = {
      from:'freshkiteksms@gmail.com',
      to: user.email,
      subject: 'New Food Order',
      html: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed', error);
        res.status(500).send('Email sending failed');
      } else {
        console.log('Email sent successfully');
        res.status(200).send('Email sent successfully');
      }
    });
  }
  

    


module.exports={Email}