import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: "All fields are required." }), { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📩 New Contact Form Message from ${name}`,
      text: message,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "✅ Message sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(JSON.stringify({ message: "❌ Something went wrong." }), { status: 500 });
  }
}
