import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omkarbiradar266@gmail.com",
    pass: "lfnm vqhw tyqa gfuw", // App password from Google
  },
});

export const sendThankYouEmail = async (to, name, eventName) => {
  const mailOptions = {
    from: "omkarbiradar266@gmail.com",
    to: to,
    subject: `Thanks for registering for ${eventName}`,
    html: `<h3>Hello ${name},</h3>
           <p>Thank you for registering for <strong>${eventName}</strong>.</p>
           <p>We’re excited to have you on board!</p>
           <br/><p>Best Regards,<br/>Neural Nexus Team</p>`,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};


