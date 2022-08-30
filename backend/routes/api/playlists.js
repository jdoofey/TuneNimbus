const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const router = express.Router();

router.post('/:playlistId/songs', requireAuth, async (req, res)=>{
  const {songId}= req.body
  const playlist = await Playlist.findByPk(req.params.playlistId, {
    include:[{model:PlaylistSong, attributes:['playlistId', ]}]
  })
  const song = await Song.findByPk(songId)
  const user = req.user
  if (playlist.userId!==user.id){
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  if (!playlist) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Playlist couldn\'t be found'
    })
  }
  if (!song) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Playlist couldn\'t be found'
    })
  }
    playlist.update(songId)
    return res.json(playlist)
//CURRENTLY NOT WORKING
  })


router.post('/', requireAuth, async (req, res)=>{
  const {name, imageUrl} = req.body
  try{

    const newPlaylist = await Playlist.create({
      name, imageUrl
    })
    return res.json(newPlaylist)
  }
  catch{
    res.statusCode = 400
    res.json({
      message:'Validation Error',
      statusCode: res.statusCode,
      errors: {
         "name": "Playlist name is required",
      }
    })
  }
})

module.exports = router;
