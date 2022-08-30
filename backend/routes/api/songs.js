const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');
const router = express.Router();



router.get('/', async (req, res) => {
  const songs = await Song.findAll()
  res.json(songs)
})

router.get('/current', requireAuth, async (req, res)=> {
  this.User=req.body
  const currUserSongs = await Song.findAll({
    where:{}
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
