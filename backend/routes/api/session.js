// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    });

    // Restore session user
    router.get(
      '/',
      restoreUser,
      (req, res) => {
        const { user } = req;
        if (user) {
          return res.json(
            user.toSafeObject()
          );
        } else return res.json(null);
      });

      const validateLogin = [
        check('credential')
          .exists({ checkFalsy: true })
          .notEmpty()
          .withMessage('Email or username is required'),
        check('password')
          .exists({ checkFalsy: true })
          .withMessage('Password is required'),
        handleValidationErrors
      ];

      router.post('/', validateLogin, async (req, res, next) => {
        const {credential, password} = req.body;
        const user = await User.login({credential, password});


        if (!user) {
            const err = new Error('Login failed');
            err.message = "Invalid credentials";
            err.status = 401;
            // err.title = 'Login failed';
            return next(err);
        }
        const newUser = await user.toSafeObject();
        const token = setTokenCookie(res, user);
        newUser.token = token
        return res.json(newUser);
    });
//nWDgbEur-qTQCWyimvsp02PuOSt7n9_L9xks

module.exports = router;
