const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@kdmc.gov' });
    
    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      console.log('Email:', existingAdmin.email);
      process.exit(0);
    }
    
    console.log('⏳ Creating KDMC Super Admin...');
    // Create new admin
    const admin = await Admin.create({
      name: 'KDMC Super Admin',
      email: 'admin@kdmc.gov',
      password: 'admin123456', 
      phone: '9876543210', 
      role: 'Super Admin',
      isVerified: true
    });
    
    console.log('\n✅ Admin created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    ', admin.email);
    console.log('🔑 Password: admin123456');
    console.log('👑 Role:     ', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();