const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistSong } = require('../../db/models');
const router = express.Router();

//this route is unnecessary :c
router.get('/', async (req, res)=>{
  const playlists = await Playlist.findAll({})
  res.json({playlists})
})

router.delete('/:playlistId', restoreUser, requireAuth, async (req, res) =>{
  const user = req.user
  const {playlistId} = req.params
  const playlist = await Playlist.findByPk(playlistId)
  
})
//edit a playlist
router.put('/:playlistId', restoreUser, requireAuth, async (req, res)=> {
  const user = req.user
  const {playlistId} = req.params
  const {name, previewImage} = req.body
  const playlist = await Playlist.findByPk(playlistId)

  if(!playlist){
    res.statusCode = 404
    res.json({
      message:'Playlist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (playlist.userId === user.id){
    if(name) playlist.name = name
    if(previewImage) playlist.previewImage = previewImage
    res.json(playlist)
}
})

//restore user makes the destructuring possible
router.post('/:playlistId/songs', restoreUser,requireAuth,async (req, res)=> {
  const {playlistId} = req.params
  const {songId} = req.body
  const user = req.user
  // const {user:{id}} = req also works, thanks sam and john
  const playlist = await Playlist.findByPk(playlistId)
  if (!playlist) {
    res.statusCode = 404
    res.json({
      message:'Playlist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  const song = await Song.findByPk(songId)
  if (!song) {
    res.statusCode = 404
    res.json({
      message:'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (playlist.userId!==user.id) {
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

router.get('/:playlistId', async (req, res)=>{
  const {playlistId} = req.params
  const playlist = await Playlist.findByPk(playlistId, {
    attributes:{exlude:[{model:PlaylistSong}]},
    include:[{
      model:Song,
      attributes:[
        'id','userId','albumId','title',
        'description','url','createdAt',
        'updatedAt','previewImage'
      ],
//try using scopes to not return playlistsong
    }],

  })
  if(!playlist){
    res.statusCode = 404
    res.json({
      message:'Playlist couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  res.json(playlist)
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
