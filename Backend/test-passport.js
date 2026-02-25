// Backend/test-passport.js
// Run this to verify Passport is configured correctly

require('dotenv').config();
const passport = require('./config/passport');

console.log('🔍 Checking Passport Configuration...\n');

// Check if passport is loaded
console.log('1. Passport object:', passport ? '✅ Loaded' : '❌ Not Loaded');

// Check strategies
console.log('2. Available strategies:', Object.keys(passport._strategies || {}));

// Check Google strategy specifically
if (passport._strategies && passport._strategies.google) {
  console.log('3. Google Strategy: ✅ Configured');
} else {
  console.log('3. Google Strategy: ❌ NOT Configured');
  console.log('\n❌ ERROR: Google strategy not found!');
  console.log('\n📋 Troubleshooting:');
  console.log('   1. Check if passport-google-oauth20 is installed');
  console.log('   2. Check your .env file has GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET');
  console.log('   3. Make sure config/passport.js is correct');
}

// Check environment variables
console.log('\n4. Environment Variables:');
console.log('   GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('   GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('   GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL || '❌ Missing');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('\n⚠️  WARNING: Google OAuth credentials are missing in .env file!');
}

console.log('\n✅ Test Complete!');