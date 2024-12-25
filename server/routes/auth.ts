import express from 'express';
import passport from 'passport';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth';

const router = express.Router();

// @route   GET /auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', isNotAuthenticated, passport.authenticate('google'));

// @route   GET /auth/google/callback
// @desc    Google auth callback
// @access  Public
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard'
  })
);

// @route   GET /auth/logout
// @desc    Logout user
// @access  Private
router.get('/logout', isAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// @route   GET /auth/user
// @desc    Get current user
// @access  Private
router.get('/user', isAuthenticated, (req, res) => {
  res.json(req.user);
});

export default router;