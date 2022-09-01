// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
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
router.post('/',validateSignup,async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    const newUser = await User.signup({ email, username, password, firstName, lastName });

    const token = await setTokenCookie(res, newUser);
    const user = newUser.toSafeObject()
    user.token = token
    return res.json(
      user
    );
  }
);
//get all albums of artist via id
router.get('/:artistId/albums', async (req, res)=>{
  const {artistId} = req.params
  const albums = await Album.findAll({
    where:{userId:artistId}
  })
  if(!albums.length){
    res.statusCode = 404;
    return res.json({
      message: 'Artist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  res.json(albums)
})
//Get all Playlists of an Artist from an id
router.get('/:artistId/playlists', async (req, res) => {
  const artistId = req.params.artistId
  const artist = await User.findAll({
    where:{id:artistId}
  })
  const playlists = await Playlist.findAll({where:{userId:artistId}})
  if (!artist.length) {
    res.statusCode = 404;
    return res.json({
      message: 'Artist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  res.json({Playlists:playlists})
})
// Get all Songs of an Artist from an id
//check if this is through /artists/.. or /users/..
router.get('/:artistId/songs', restoreUser, requireAuth, async (req, res) => {
  const artistId = req.params.artistId
  const songsByArtist = await User.findByPk(artistId, {
    include:[
      {
        model: Song,
        attributes: ['id', 'userId', 'albumId', 'title',
          'description', 'url', 'createdAt', 'updatedAt',
          'previewImage']
      },
    ]
  })
  if (!songsByArtist && songsByArtist=='') {
    res.statusCode = 404;
    return res.json({
      statusCode: res.statusCode,
      message: 'Artist couldn\'t be found'
    })
  }
  return res.json(songsByArtist)
})
//get details of an artist from an id
router.get('/:artistId', async (req, res)=>{
    const {artistId} = req.params
    const songs= await Song.count({
      where:{userId:artistId}
    })
    const albums = await Album.count({
      where:{userId:artistId}
    })
    const artist = await User.findByPk(artistId, {
      attributes: {
        exclude:['firstName', 'lastName']
      }
    })
    if(!artist){
      res.statusCode = 404;
    return res.json({
      statusCode: res.statusCode,
      message: 'Artist couldn\'t be found'
    })
    }
    return res.json({
      id: artist.id,
      username: artist.username,
      totalSongs: songs,
      totalAlbums: albums,
      previewImage: artist.previewImg
    })
})
// Restore session user
router.get(
  '/current',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
  );

module.exports = router;
