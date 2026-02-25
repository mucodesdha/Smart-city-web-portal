// Backend/routes/adminRoutes.js
// NEW FILE - Create this file

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { protectAdmin } = require('../middleware/authMiddleware');

// Middleware to check if user is Super Admin
const isSuperAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin || admin.role !== 'Super Admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super Admin only.'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authorization error'
    });
  }
};

// Get all admins (Super Admin only)
router.get('/all-admins', protectAdmin, isSuperAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    
    res.json({
      success: true,
      admins
    });
  } catch (error) {
    console.error('Fetch admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch administrators'
    });
  }
});

// Create new admin (Super Admin only)
router.post('/create-admin', protectAdmin, isSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }
    
    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password,
      phone,
      role: role || 'Admin',
      isVerified: true
    });
    
    console.log('✅ New admin created by Super Admin:', admin.email);
    
    res.status(201).json({
      success: true,
      message: 'Administrator created successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create administrator'
    });
  }
});

// Delete admin (Super Admin only)
router.delete('/delete-admin/:id', protectAdmin, isSuperAdmin, async (req, res) => {
  try {
    const adminToDelete = await Admin.findById(req.params.id);
    
    if (!adminToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Administrator not found'
      });
    }
    
    // Prevent deleting Super Admins
    if (adminToDelete.role === 'Super Admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete Super Administrator'
      });
    }
    
    // Prevent admin from deleting themselves
    if (adminToDelete._id.toString() === req.admin._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }
    
    await Admin.findByIdAndDelete(req.params.id);
    
    console.log('✅ Admin deleted:', adminToDelete.email);
    
    res.json({
      success: true,
      message: 'Administrator deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete administrator'
    });
  }
});

module.exports = router;