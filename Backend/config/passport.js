const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('✅ Google callback received:', profile.emails[0].value);
      
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        console.log('✅ User found:', user.email);
        return done(null, user);
      }
      
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        console.log('✅ Linking Google to existing user');
        user.googleId = profile.id;
        user.isVerified = true;
        await user.save();
        return done(null, user);
      }
      
      console.log('✅ Creating new user');
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        phone: '',
        isVerified: true,
        language: 'English'
      });
      
      console.log('✅ User created:', user.email);
      done(null, user);
      
    } catch (error) {
      console.error('❌ GOOGLE OAUTH ERROR:', error.message);
      console.error('Full error:', error);
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;