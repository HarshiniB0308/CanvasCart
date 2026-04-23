import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './backend/src/models/User.js';

dotenv.config({ path: './backend/.env' });

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({}, 'name email role');
    console.log('Current Users in Database:');
    console.table(users.map(u => ({ name: u.name, email: u.email, role: u.role })));

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkUsers();
