const nodemailer = require('nodemailer');

const getTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });
};

async function sendOtpEmail(to, otp, purpose) {
  const transporter = getTransporter();
  
  const subject = purpose === 'signup' 
    ? 'Verify Your Identity - Kricketers Space' 
    : 'Login Code - Kricketers Space';
    
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px; text-align: center;">
      <h2 style="color: #1a1a1a; letter-spacing: 2px; text-transform: uppercase;">The Grandstand</h2>
      <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; margin: 20px auto; max-width: 500px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h1 style="color: #1a1a1a; margin-bottom: 20px;">Your Verification Code</h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
          Use the following 6-digit code to complete your ${purpose === 'signup' ? 'registration' : 'login'} process.
        </p>
        <div style="background-color: #f0f0f0; padding: 20px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ffb957; border-radius: 4px;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 14px; margin-top: 30px;">
          This code is valid for 5 minutes. DO NOT share this code with anyone.
        </p>
      </div>
      <p style="color: #ccc; font-size: 12px; margin-top: 40px;">
        &copy; ${new Date().getFullYear()} Pavilion Elite Security. All rights reserved.
      </p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Kricketers Space" <${process.env.SMTP_FROM || 'no-reply@kricketersspace.com'}>`,
      to,
      subject,
      html,
    });
    console.log('📧 Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Failed to send verification email');
    }
    return false;
  }
}

module.exports = {
  sendOtpEmail,
};