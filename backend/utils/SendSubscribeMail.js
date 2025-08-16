import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omkarbiradar266@gmail.com",
    pass: "lfnm vqhw tyqa gfuw", // App password from Google
  },
});

export const sendSubscribeMail= async (to) => {
  const mailOptions = {
    from: "omkarbiradar266@gmail.com",
    to: to,
    subject: `Thanks for Subscribing`,
    html: `
  <h3>Hello,</h3>
  <p>Thank you for subscribing to Neural Nexus updates!</p>
  <p>You’ll now receive notifications about our upcoming events, workshops, and announcements.</p>
  <br/>
  <p>We’re thrilled to have you with us!</p>
  <br/>
  <p>Best Regards,<br/>Neural Nexus Team</p>
`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};


