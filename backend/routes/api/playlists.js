const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistSong } = require('../../db/models');
const router = express.Router();

//this route is unnecessary :c
router.get('/', async (req, res)=>{
  const playlists = await Playlist.findAll({})
  res.json({playlists})
})

router.post('/:playlistId/songs', restoreUser,requireAuth,async (req, res)=> {
  const {playlistId} = req.params
  const {songId} = req.body
  const {user:{id}} = req
  const playlist = await Playlist.findByPk(playlistId)
  if(!playlist) {
    res.statusCode = 404
    res.json({
      message:'Playlist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  const song = await Song.findByPk(songId)
  if(!song) {
    res.statusCode = 404
    res.json({
      message:'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if(playlist.userId!==id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  await playlist.addSong(song)
  const playlistSong = await PlaylistSong.findOne({
    where:{playlistId, songId},
    attributes:{
      include:['id','playlistId','songId'],
      exclude:['createdAt','updatedAt']
    }
  })

  res.json(playlistSong)
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
