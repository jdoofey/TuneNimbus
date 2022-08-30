// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// backend/routes/api/users.js
// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Names must be 2 characters or more.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Names must be 2 characters or more.'),
  handleValidationErrors
];
// backend/routes/api/users.js
// ...
// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

router.get('/:artistId/songs', async (req, res) => {
  const songsByArtist = await Song.findAll({
    where:{userId:req.params.artistId}
  })
  if (!songsByArtist || songsByArtist=='') {
    res.statusCode = 404;
    res.json({
      message: 'Artist couldn\'t be found',
      statusCode: res.statusCode
    })
  }
  res.json(songsByArtist)
})

// Restore session user
// router.get(
//   '/current',
//   restoreUser,
//   (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else return res.json({});
//   }
//   );

module.exports = router;
