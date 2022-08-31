const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();


router.get('/:songId/comments', async (req, res)=>{
  // const song = await Song.findByPk(req.params.songId)
  const comment = await Comment.findAll({
    where:{songId:req.params.songId},
    include:[{model:User, attributes:['id', 'username']}]
  })
  if(!comment || comment==''){
    res.statusCode = 404
    res.json({
      statusCode:res.statusCode,
      message:"Song couldn\'t be found"
    })
  }
  else res.json({Comments:comment})
})

router.post('/:songId/comments', restoreUser, requireAuth, async(req, res)=>{
  const {body} = req.body
  const userId = req.user.id;
  const songId = req.params.songId
  const song = await Song.findByPk(songId)
  if(!song){
    res.statusCode = 404
    res.json({
      statusCode:res.statusCode,
      message:'Song couldn\'t be found'
    })
  }
  const newComment = await Comment.create({
    body, userId, songId

  })
  res.json(newComment)
})



router.post('/', requireAuth, restoreUser, async (req, res)=> {
  const user = req.user;
  const {title, description, url, previewImage, albumId} = req.body
  const album = await Album.findByPk(albumId)
  if(album.userId !== user.id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  const newSong = await Song.create({
    title, description, url, previewImage, albumId
  })
  //tested NO POSTMAN TEST need to add errorsNOT DONE YET
  return res
    .status(201)
    .json(newSong)
})

router.delete('/:songId', requireAuth, async (req, res)=> {
  const song = await Song.findByPk(req.params.songId)
  const user=req.user
  if(song.userId!==user.id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
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

router.put('/:songId', requireAuth, restoreUser, async(req, res)=>{
  const userId=req.user.id
  const { title, description, url, previewImage, albumId} = req.body
  const song = await Song.findByPk(req.params.songId)
  if(userId!== song.userId) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  if (!song) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Song couldn\'t be found'
    })
  }

    if (title && url) {
      song.title = title
      song.url = url
      song.description = description
      song.albumId = albumId
      song.previewImage = previewImage
      return res.json(song)
    }
    else {
      res.statusCode = 400
      res.json({
        message:'Validation Error',
        statusCode: res.statusCode,
        errors: {
           title: "Song title is required",
            url: "Audio is required"
        }
      })

    }

})
//Get all Songs working
router.get('/', async (req, res) => {
  const songs = await Song.findAll()
  res.json(songs)
})
//Get all Songs created by the Current User working
router.get('/current', requireAuth, restoreUser,async (req, res)=> {
  const currUserId = req.user.id
  const currUserSongs = await Song.findAll({
    where:{userId:currUserId}
    //get all songs by current user WIP
  })
  if(!currUserSongs){
    res.statusCode = 404;
    res.json({
      statusCode: res.statusCode,
      message: 'You haven\'t uploaded any songs yet',
    })
  }
  res.json(currUserSongs)
})

router.get('/:songId', async (req, res) => {
  const {songId} = req.params
  const songById =  await Song.findByPk(songId, {
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
