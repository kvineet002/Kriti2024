const nodemailer = require('nodemailer');

const EMAIL = "collampus@outlook.com";
const PASSWORD = "Vineet@123";
let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL, // Your Outlook email address
      pass: PASSWORD, // Your Outlook password
    },
  });
const emailService = {
    sendFollowNotification: async function sendFollowNotification(targetUser, user) {
     try{let mailOptions = {
      from: EMAIL,
      to: targetUser.Email,
      subject: 'Hey! Message from Collampus IIT Guwahati',
      html: `<!DOCTYPE html>
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
          margin-top: 30px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        .logo {
          font-size: x-large;
          font-weight: bold;
          padding-bottom: 15px;
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
          transition: all 0.3s ease;
          margin-bottom:30px;
        }
        .profile-link a:hover {
          background-color: #fff;
          color: #000;
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
        <div class="logo" style="color: #fff;">COLLAMPUS</div>
        <div class="message">
          <p><div class="message" style="color: #fff;">Hey <span class="name">${targetUser.Name}</span>,<br> <span class="name">${user.Name}</span> started following you</div></p>
        </div>
        <div class="profile-link">
          <a href="https://collampus.vercel.app/profile/${user._id}">Check out the profile</a>
        </div>
      </div>
      </body>
      </html>
      `
    };

    await transporter.sendMail(mailOptions);}
    catch(err){
      console.log("Error in sending the Email::"+err);
    }
  },
  sendCommentNotification: async function sendCommentNotification(targetUser, user) {
    try {
      let mailOptions = {
        from: EMAIL,
        to: targetUser.email,
        subject: 'Hey! Message from Collampus IIT Guwahati',
        html: `<h1>Hey ${user.Name} Commented on your project</h1>`
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log("Error in sending the Email::" + err);
    }
  },
  sendLikeNotification: async function sendLikeNotification(targetUser, user) {
    try {
      let mailOptions = {
        from: EMAIL,
        to: targetUser.email,
        subject: 'Hey! Message from Collampus IIT Guwahati',
        html: `<h1>Hey ${user.Name} Liked your your project</h1>`
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log("Error in sending the Email::" + err);
    }
  },
};

module.exports = { emailService };
