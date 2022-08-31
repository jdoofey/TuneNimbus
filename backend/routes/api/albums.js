const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();

//get all albums
router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums:albums})
})


module.exports = router;
