const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const router = express.Router();

router.post('/', requireAuth, async (req, res)=> {
  const user = req.user;
  const {title, description, url, previewImage, albumId} = req.body
  const newSong = await Song.create({
    title, description, url, previewImage, albumId
  })
  //tested NO POSTMAN TEST need to add errors
  return res.json(newSong)
})

router.delete('/:songId', requireAuth, async (req, res)=> {
  const song = await Song.findByPk(req.params.songId)
  if (!song) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Song couldn\'t be found'
    })
  }
  await song.destroy()
  res.statusCode = 200
  res.json({statusCode:res.statusCode,
  message:'Successfully deleted'})
})

router.put('/:songId', requireAuth, async(req, res)=>{
  const { title, description, url, previewImage, albumId} = req.body
  const song = await Song.findByPk(req.params.songId)
  if (!song) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Artist couldn\'t be found'
    })
  }
  try {
    song.update({
    title, description, url, previewImage, albumId
    })
  return res.json(song)
  } catch {
    res.statusCode = 400
    res.json({
      message:'Validation Error',
      statusCode: res.statusCode,
      errors: {
         "title": "Song title is required",
    "url": "Audio is required"
      }
    })
  }
})

router.get('/', async (req, res) => {
  const songs = await Song.findAll()
  res.json(songs)
})

router.get('/current', requireAuth, async (req, res)=> {
  const userId = req.user.id
  const currUserSongs = await Song.findAll({
    where:{userId:userId}
    //get all songs by current user WIP
  })
  res.json(currUserSongs)
})

router.get('/:songId', async (req, res) => {

  const songById =  await Song.findByPk(req.params.songId, {
    include:[
      {
        model:User,
        as:'Artist',
        attributes:['id', 'username', 'previewImg']
      },
      {
        model:Album,
        attributes:['id', 'title', 'previewImage']
      }
    ]
  });
  if (!songById) {
    res.statusCode = 404;
    res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode
    })
  }
  res.json(songById)
})

module.exports = router;
