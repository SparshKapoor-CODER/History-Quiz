// server.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  consentedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Endpoint to save email
app.post('/api/save-email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'No email provided' });

  try {
    await User.findOneAndUpdate(
      { email },
      { email, consentedAt: new Date() },
      { upsert: true, new: true, runValidators: true }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
