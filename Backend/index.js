import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authrout from './routes/authRout.js';
import bookingRoutes from './routes/bookingRout.js';
import adminRouts from './routes/adminRout.js';
  
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
 
app.use('/api/devmatch/auth', authrout)
app.use('/api/devmatch/bookings', bookingRoutes);
app.use('/api/devmatch/admin', adminRouts);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Error:', err));

 
app.get('/', (req, res) => {
  res.send('Welcome to DevMatch ');
});

 
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running`));
