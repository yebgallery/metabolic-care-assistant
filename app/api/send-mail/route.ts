import { EMAIL, RECIPIENT_EMAIL } from "@/lib/constants";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(req: Request) {
  const data = await req.json();
  const mailOptions = {
    from: EMAIL,
    to: RECIPIENT_EMAIL,
    subject: `New message from ${data.name}`,
    html: `<p>Hello Yeb Gallery,</p>
<p>You got a new message from ${data.name}:</p>
<p>Sender Email: ${data.email}:</p>
Message: 
<p style="padding: 10px; font-style: italic;">
 ${data.message}
</p>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ data, message: "Email sent successfully!" });
  } catch (error) {
    return Response.json({
      error: 500,
      message: "An error occurred while sending the email.",
    });
  }
}
