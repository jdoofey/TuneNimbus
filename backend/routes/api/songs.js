const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res) => {
  const songs = await Song.findAll()
  res.json(songs)
})


router.get('/current', restoreUser, async (req, res) => {
  //WIP REQUIRES AUTHENTICATION
    const currentUserSongs = await Song.findByPk({
      where:{userId:this.user.id}
    })
    res.json(currentUserSongs)
})



module.exports = router;
