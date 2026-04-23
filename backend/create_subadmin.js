import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const createSubAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const subAdminExists = await User.findOne({ email: 'subadmin@example.com' });
    if (subAdminExists) {
      console.log('Subadmin already exists. Updating role to Sub Admin...');
      subAdminExists.role = 'Sub Admin';
      await subAdminExists.save();
    } else {
      await User.create({
        name: 'Assistant Admin',
        email: 'subadmin@example.com',
        password: 'subadmin123',
        role: 'Sub Admin'
      });
      console.log('Subadmin user created successfully!');
    }

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createSubAdmin();
