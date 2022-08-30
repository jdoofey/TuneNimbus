const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) => {
  const songs = await Song.findAll()
  res.json(songs)
})

module.exports = router;
