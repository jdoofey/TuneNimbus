const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();
const {Op} = require('sequelize')



router.get('/:songId/comments', async (req, res)=>{
  // const song = await Song.findByPk(req.params.songId)
  const comment = await Comment.findAll({
    where:{songId:req.params.songId},
    include:[{model:User, attributes:['id', 'username']}]
  })
  if(!comment || comment=='' ){
    res.statusCode = 404
    res.json({
      statusCode:res.statusCode,
      message:"Song couldn\'t be found"
    })
  }
  else res.json({Comments:comment})
})

router.post('/:songId/comments', async (req, res) => {
  const { songId } = req.params
  const user = req.user

  const song = await Song.findByPk(songId)
  if (!song) {
    res.statusCode = 404
    return res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  const comment = await Comment.create({
    userId: user.id,
    body: req.body.comment,
    songId: songId
  })

  return res.json({
    userId: user.id,
    body: req.body.comment,
    songId: songId,
    User:{id: user.id, username:user.username}
  })
})
// router.post('/:songId/comments', restoreUser, requireAuth, async(req, res)=>{
//   const {body} = req.body
//   const userId = req.user.id;
//   const songId = req.params.songId
//   const song = await Song.findByPk(songId)
//   if(!song){
//     res.statusCode = 404
//     res.json({
//       statusCode:res.statusCode,
//       message:'Song couldn\'t be found'
//     })
//   }
//   const newComment = await Comment.create({
//     body, userId, songId

//   })
//   res.json(newComment)
// })



router.post('/', requireAuth, restoreUser, async (req, res)=> {
  const user = req.user;
  const {title, description, url, previewImage, albumId, } = req.body
  const album = await Album.findByPk(albumId)
  if(albumId){
    if(album===null) {
      res.statusCode = 404
      res.json({
        statusCode:res.statusCode,
        message:'Album couldn\'t be found'
      })
    }
    if(album.userId !== user.id) {
      res.statusCode = 401
      res.json({
        statusCode: res.statusCode,
        message: 'Unauthorized'
      })
    } else {
      const newSong = await Song.create({
        userId:user.id, title, description, url, previewImage, albumId
      })
      return res
      .status(201)
      .json(newSong)
    }
  }
  if(!albumId){

    const newSong = await Song.create({
      userId:user.id,title, description, url, previewImage, albumId,
    })
    return res
      .status(201)
      .json(newSong)
  }
})

router.delete('/:songId', requireAuth, async (req, res)=> {
  const song = await Song.findByPk(req.params.songId)
  const user=req.user
  if (!song) {
    res.statusCode = 404
    res.json({
      statusCode: res.statusCode,
      message: 'Song couldn\'t be found'
    })
  }
  if(song.userId!==user.id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  await song.destroy()
  res.statusCode = 200
  res.json({statusCode:res.statusCode,
  message:'Successfully deleted'})
})

router.put('/:songId', requireAuth, restoreUser, async(req, res)=>{
  const userId=req.user.id
  const { title, description, url, imageUrl, albumId} = req.body
  const song = await Song.findByPk(req.params.songId,

    )
  if (!song) {
    res.statusCode = 404
    res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if(userId!== song.userId) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }

  if(title===null) {
    res.json({
      message:'Validation Error',
    statusCode: 400,
    errors: {url: "Title is required"}
    })
  }
  if(url===null) {
    res.json({
      message:'Validation Error',
    statusCode: 400,
    errors: {url: "Audio is required"}
    })
  }
    if (title && url && albumId) {
      song.title = title
      song.url = url
      song.description = description
      song.albumId = albumId
      song.previewImage = imageUrl
      await song.save()

      return res.json(song)
    }
    if (title && url && !albumId) {
      song.title = title
      song.url = url
      song.description = description
      song.albumId = null
      song.previewImage = imageUrl
      await song.save()

      return res.json(song)
    }
})



//Get all Songs working
//sam saves the day
router.get('/', async (req, res) => {
  let {page,size,createdAt, title} = req.query

  const pagination = {};
  const where = {};

  if(page)page=parseInt(page);
  if(size)size=parseInt(size);

  if(!page||page<0)page=1;
  if(!size||size<0)size=30;
  if(page>10)page=10;
  if(size>20)size=30;

  pagination.limit=size;
  pagination.offset=size*(page-1);

  if(title) where.title = {[Op.substring]:title}
  //functioning properly thanks john
  if(createdAt) {
    date = new Date(createdAt)
    const prevDay = date.getDate()
    const month = date.getMonth()
    const year =date.getFullYear()
    const day= date.getDate()+1
    const nextDay = date.getDate()+2
    const before = new Date(year,month,prevDay)
    const after = new Date(year,month,nextDay)
    where.createdAt = {[Op.between]:[before,after]}
  }
  const songs = await Song.findAll({
    where,
    ...pagination,

  })
  res.json({Songs:songs, page, size})
})
//Get all Songs created by the Current User working
router.get('/current', requireAuth, restoreUser,async (req, res)=> {
  const currUser = req.user
  const currUserSongs = await Song.findAll({
    where:{userId:currUser.id}
  })
  if(!currUserSongs.length){
    res.statusCode = 404;
    res.json({
      statusCode: res.statusCode,
      message: 'You haven\'t uploaded any songs yet',
    })
  }
  res.json({Songs:currUserSongs})
})

router.get('/:songId', async (req, res) => {
  const {songId} = req.params
  const songById =  await Song.findByPk(songId, {
    include:[
      {
        model:User,
        as:'Artist',
        attributes:['id', 'username', 'previewImage']
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
