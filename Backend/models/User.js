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
   
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'developer', 'editor','admin'],
    default: 'user'
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
