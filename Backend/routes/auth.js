const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Citizen routes
router.post('/register', authController.registerCitizen);
router.post('/verify-otp', authController.verifyOTP);
router.post('/resend-otp', authController.resendOTP);
router.post('/login', authController.loginCitizen);

// Admin routes
router.post('/admin/login', authController.loginAdmin);
router.post('/admin/verify-otp', authController.verifyAdminOTP);
router.post('/admin/resend-otp', authController.resendAdminOTP);

// Google OAuth routes ONLY
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&user=${encodeURIComponent(JSON.stringify({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      language: req.user.language
    }))}`);
  }
);

module.exports = router;