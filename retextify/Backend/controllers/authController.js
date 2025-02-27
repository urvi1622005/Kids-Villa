import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log("Incoming registration request:", req.body);  // Debugging

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain a combination of uppercase, lowercase, numbers, and symbols'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
      return res.status(500).json({ message: "JWT configuration error" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRE, 10)
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error("Registration Error:", error); // Debugging
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    console.log("Incoming login request:", req.body); // Debugging

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRE) {
      return res.status(500).json({ message: "JWT configuration error" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRE, 10)
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });

  } catch (error) {
    console.error("Login Error:", error); // Debugging
    res.status(500).json({ message: error.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    console.log("Incoming forgot password request:", req.body); // Debugging

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT configuration error" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '10m'
    });

    console.log("Generated reset token:", resetToken); // Debugging

    // TODO: Send email with reset token
    res.status(200).json({ resetToken });

  } catch (error) {
    console.error("Forgot Password Error:", error); // Debugging
    res.status(500).json({ message: error.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    console.log("Incoming reset password request:", req.body); // Debugging

    const { resetToken } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || !validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and contain a combination of uppercase, lowercase, numbers, and symbols' 
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT configuration error" });
    }

    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    console.error("Reset Password Error:", error); // Debugging
    res.status(500).json({ message: error.message });
  }
};
