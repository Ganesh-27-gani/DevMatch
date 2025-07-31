import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
     type: Number,
     required: true
   },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'developer', 'editor'],
    default: 'customer'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);
