const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// ============================================
// CITIZEN REGISTRATION - NO OTP
// ============================================

exports.registerCitizen = async (req, res) => {
  try {
    const { name, email, password, phone, language } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }
    
    // Create user - AUTO VERIFIED (No OTP needed)
    const user = await User.create({
      name,
      email,
      password,
      phone,
      language,
      isVerified: true  // Auto-verify without OTP
    });
    
    console.log('✅ User registered:', user.email);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now login.'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
};

// ============================================
// THESE ARE NOT NEEDED ANYMORE (OTP functions removed)
// ============================================

exports.verifyOTP = async (req, res) => {
  res.status(400).json({
    success: false,
    message: 'OTP verification not required'
  });
};

exports.resendOTP = async (req, res) => {
  res.status(400).json({
    success: false,
    message: 'OTP not required'
  });
};

// ============================================
// CITIZEN LOGIN
// ============================================

exports.loginCitizen = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check if user registered via OAuth (no password)
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'Please login using your Google account'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    console.log('✅ User logged in:', user.email);
    
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        createdAt: user.createdAt
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// ============================================
// ADMIN LOGIN - NO OTP (Simplified)
// ============================================

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find admin
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }
    
    // Generate token - NO OTP, direct login
    const token = generateToken(admin._id);
    
    console.log('✅ Admin logged in:', admin.email);
    
    res.json({
      success: true,
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
};

// ============================================
// ADMIN OTP FUNCTIONS - NOT NEEDED
// ============================================

exports.verifyAdminOTP = async (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Admin OTP not required'
  });
};

exports.resendAdminOTP = async (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Admin OTP not required'
  });
};

module.exports = exports;