import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

// Fix for util.inherits issue
// import util from 'util';

// if (!util.inherits) {
//   util.inherits = function (ctor, superCtor) {
//     Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
//   };
// }

dotenv.config();

if (!process.env.MONGO_URI) {
  console.error('❌ Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Server is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
