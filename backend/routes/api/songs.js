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

router.get('/:userId', async (req, res) => {
  const songsByUser = await Song.findAll({
    where:{userId:req.params.userId}
  })
  res.json(songsByUser)
})
//implementation intended for get all songs by CURRENT user
//but works as get all songs from an artist by ID;
//note there is a difference between docs path and postman
//tests
module.exports = router;
