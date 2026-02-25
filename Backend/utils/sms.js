const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate 6-digit OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via SMS
exports.sendOTP = async (phone, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your KDMC verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${phone}` // Add country code for India
    });
    
    console.log('SMS sent successfully:', message.sid);
    return { success: true, messageId: message.sid };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { success: false, error: error.message };
  }
};

// Mask phone number for security
exports.maskPhone = (phone) => {
  if (!phone || phone.length < 4) return '****';
  return '******' + phone.slice(-4);
};