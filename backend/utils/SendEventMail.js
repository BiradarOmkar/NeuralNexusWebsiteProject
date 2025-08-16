import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omkarbiradar266@gmail.com",
    pass: "lfnm vqhw tyqa gfuw", // App password from Google
  },
});

export const sendEventMail = async (to,eventtitle,eventDescription,eventDate,eventTime,eventVenue) => {
  const mailOptions = {
    from: "omkarbiradar266@gmail.com",
    to: to,
    subject: `You're Invited! Join Us for "${eventtitle}"
`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
  
  <!-- Banner Image -->

  <!-- Greeting -->
  <h2 style="color: #1a73e8;">Hello Subscriber,</h2>

  <!-- Event Introduction -->
  <p>We are excited to announce a new event organized by Neural Nexus:</p>

  <!-- Event Title -->
  <h3 style="color: #333; margin-top: 0;">${eventtitle}</h3>

  <!-- Event Description -->
  <p>${eventDescription}</p>

  <!-- Event Details -->
  <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px; font-weight: bold;">Date:</td>
      <td style="padding: 8px;">${eventDate}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold;">Time:</td>
      <td style="padding: 8px;">${eventTime}</td>
    </tr>
    <tr>
      <td style="padding: 8px; font-weight: bold;">Venue:</td>
      <td style="padding: 8px;">${eventVenue}</td>
    </tr>
  </table>

  <!-- Registration Button -->
  <div style="text-align: center; margin: 20px 0;">
    <a href="$" 
       style="background-color:#1a73e8;color:white;padding:12px 25px;border-radius:5px;text-decoration:none;font-weight:bold;">
       Register Now
    </a>
  </div>

  <!-- Footer -->
  <p style="margin-top: 30px;">We look forward to your participation!</p>
  <p>Best Regards,<br/>Neural Nexus Team</p>

</div>
    `,
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};


