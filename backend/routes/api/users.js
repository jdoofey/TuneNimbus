// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

// Sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);
//nQr3YABp--tPZivCJAuWZLw-THHM-iqDQLMc
module.exports = router;
