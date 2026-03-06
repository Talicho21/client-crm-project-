const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    const admins = [
      {
        username: 'Super Admin',
        email: 'admin@crm.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        username: 'John Admin',
        email: 'john@crm.com',
        password: 'john123',
        role: 'admin'
      },
      {
        username: 'Sarah Manager',
        email: 'sarah@crm.com',
        password: 'sarah123',
        role: 'admin'
      }
    ];

    for (const adminData of admins) {
      const existingAdmin = await User.findOne({ email: adminData.email });
      
      if (existingAdmin) {
        console.log(`⚠️  Admin already exists: ${adminData.email}`);
      } else {
        const admin = new User(adminData);
        await admin.save();
        console.log(`✅ Admin created: ${adminData.email} / ${adminData.password}`);
      }
    }

    console.log('\n🎉 Admin setup complete!');
    console.log('\n📝 You can login with:');
    console.log('------------------------');
    console.log('admin@crm.com / admin123');
    console.log('john@crm.com / john123');
    console.log('sarah@crm.com / sarah123');
    console.log('------------------------');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('📦 Disconnected from MongoDB');
  }
};

createAdmin();