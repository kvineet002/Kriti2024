const nodemailer = require('nodemailer');

// Ensure that environment variables are set properly
const EMAIL = process.env.DEV_EMAIL;
const PASSWORD = process.env.DEV_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error('EMAIL or PASSWORD environment variables are not set!');
  process.exit(1); // Exit the process if credentials are not set
}

// Create the transporter with Gmail service
let transporter2 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL, // Gmail email address from environment variable
    pass: PASSWORD, // Gmail password or App Password if 2FA is enabled
  },
});

// Define the function to send the email
const sendEmail = async (req, res) => {
  try {
    const { email, name, message,budget } = req.body;

    // Log the environment variables to debug (make sure to remove this in production)
    console.log('Email:', EMAIL);
    console.log('Password:', PASSWORD);

    // Define the mail options
    let mailOptions = {
      from: EMAIL, // Sender email
      to: [
          'hello@devbranch.in'
      ], 
      cc:[
      'vineet.mech22@iitg.ac.in',
      'venkatesh.m@iitg.ac.in',
      'devbranch24@gmail.com',
      ],
      subject: 'DevBranch Query from website',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            padding-bottom: 100px;
            background-color: #000;
          }
          .container {
            background-color: #000;
            color: #fff;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }
          .logo {
            font-size: 45px;
            font-weight: bold;
            padding-bottom: 10px;
            text-align: center;
            border-bottom: 1px solid #565656;
          }
          .message {
            padding: 20px;
            text-align: center;
          }
          .name{
            color: #fff;
            font-weight: bold;
          }
          .profile-link {
            text-align: center;
            margin-top: 15px;
          }
          .profile-link a {
            color: #fff;
            text-decoration: none;
            border: 1px solid #565656;
            padding: 10px 20px;
            width: 20px;
            transition: all 0.3s ease;
            margin-bottom:30px;
          }
          .profile-link a:hover {
            background-color: #fff;
            color: #000;
          }
            .dot-color {
            color: #4CE6A6;
            }
          .footer {
            padding-left: 5px;
            color: #565656;
            margin-top: 20px;
            font-size: 14px;
          }
        </style>
        </head>
        <body>
        <div class="container">
          <div class="logo" style="color: #fff;">dB<span class="dot-color">.</span></div>
          <div class="message">
            <p>
              <div class="message" style="color: #fff;">
                <span class="name">${name}</span> sent a query via the website.
              </div>
            </p>
            <p><b>Message:</b> ${message}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Budget:</b> ${budget}</p>
          </div>
          <div class="profile-link">
            <a href="mailto:${email}">Reply</a>
          </div>
        </div>
        </body>
        </html>
      `,
    };

    // Send the email using Nodemailer
    await transporter2.sendMail(mailOptions);

    // Respond with a success message
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { sendEmail };
