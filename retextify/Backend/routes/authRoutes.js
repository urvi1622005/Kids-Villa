import express from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

// Create a router instance
const router = express.Router();

// Route: Register a new user
// POST /api/auth/register
router.post('/register', registerUser);

// Route: Login a user
// POST /api/auth/login
router.post('/login', loginUser);

// Route: Forgot password (request password reset)
// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// Route: Reset password (using reset token)
// PUT /api/auth/reset-password/:resetToken
router.put('/reset-password/:resetToken', resetPassword);

// Export the router
export default router;