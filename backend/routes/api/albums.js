const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();


//all albums by current user
router.get('/current', restoreUser, requireAuth, async (req, res)=> {
  const {id} = req.user
  const albums = await Album.findAll({
    where:{userId:id}
  })
  if(!albums){
    res.statusCode = 404
    res.json({
      message: 'You haven\'t created any albums yet',
      statusCode: res.statusCode,
    })
  }
  res.json({Albums:albums})
})
//edit an album
router.put('/:albumId', restoreUser, requireAuth, async (req, res)=> {
  const {user} = req
  const {albumId} = req.params
  const {title, description, imageUrl} = req.body
  const album = await Album.findByPk(albumId)
  if(!album){
    res.statusCode = 404
    return res.json({
      message: 'Album couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if(album.userId === user.id) {
    if(title===null) {
      return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "title": "Album title is required"
        }
      })
    }
    if(title) album.title = title
    if(description) album.description = description
    if(imageUrl) album.previewImage = imageUrl
    await album.save()
    return res.json(album)
  }
  if (album.userId!==user.id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
})
//create an album
router.post('/', restoreUser, requireAuth, async(req, res)=>{
  const {user} = req
  const {title, description, previewImage} = req.body
  //check validation error
  const newAlbum = await Album.create({
    userId:user.id,
    title,
    description,
    previewImage
  })
  res.json(newAlbum)
})
//get details of an album from an id
router.get('/:albumId', async (req, res)=>{
  const {albumId} = req.params
  const album = await Album.findByPk(albumId, {
    include:[
      {model:User, as:'Artist',
        attributes:['id', 'username','previewImg']
      },
      {model:Song}
    ]
  })
  if(!album) {
    res.statusCode = 404
    res.json({
      message: 'Album couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  return res.json(album)
})
//get all albums
router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums:albums})
})


module.exports = router;
