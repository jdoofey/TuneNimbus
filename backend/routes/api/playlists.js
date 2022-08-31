const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const router = express.Router();

//this route is unnecessary :c
router.get('/', async (req, res)=>{
  const playlists = await Playlist.findAll({})
  res.json({playlists})
})

router.post('/', restoreUser, requireAuth, async (req, res)=>{
  const userId = req.user.id
  const {name, previewImage} = req.body
  const playlist = await Playlist.create({name, userId, previewImage})
  if (!name || name===undefined || name===null) {
    res.statusCode = 400
    res.json({
      message:'Validation Error',
      statusCode: res.statusCode,
      errors: {
         name: "Playlist name is required",
      }
    })
  }
  else {
    res.status(201)
    res.json({playlist})
  }
})


module.exports = router;
