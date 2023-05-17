const nodemailer = require('nodemailer');


 const Email =(req, res) => {
    const { cartItems, user } = req.body;
  
    // Create the email message
    const message = `
    <div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px; display: flex; justify-content: center; align-items: center; height: 100vh; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); padding: 20px; border-radius: 8px;">
      <div style="background-color: #fff; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center;">Successfully Placed! Enjoy your Meal!!</h2>
        <p><strong>User:</strong> ${user.name}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <h3>Cart Items:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${cartItems
            .map(
              (item) => `
            <li style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
              <p><strong>Item:</strong> ${item.name}</p>
              <p><strong>Price:</strong> $${item.price}</p>
              <p><strong>Quantity:</strong> ${item.quantity}</p>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    </div>
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