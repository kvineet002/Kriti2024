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
    sendFollowNotification: async function sendFollowNotification(email, user) {
     try{let mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'Hey! Message from Collampus IIT Guwahati',
      html: `<h1 style="text:uppercase;">Hey ${user.Name} started following you</h1>`
    };

    await transporter.sendMail(mailOptions);}
    catch(err){
      console.log("Error in sending the Email::"+err);
    }
  },
  sendCommentNotification: async function sendCommentNotification(email, user) {
    try {
      let mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Hey! Message from Collampus IIT Guwahati',
        html: `<h1>Hey ${user.Name} Commented on your project</h1>`
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log("Error in sending the Email::" + err);
    }
  },
  sendLikeNotification: async function sendLikeNotification(email, user) {
    try {
      let mailOptions = {
        from: EMAIL,
        to: email,
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
