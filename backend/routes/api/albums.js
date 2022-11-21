const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Album title is required'),
  handleValidationErrors
];
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
//delete an album
router.delete('/:albumId', restoreUser, requireAuth, async(req,res)=>{
  const {user} = req
  const {albumId} = req.params
  const album = await Album.findByPk(albumId)
  if (!album){
    res.statusCode = 404
    return res.json({
      message: 'Album couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (album.userId!==user.id) {
    res.statusCode = 401
    res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  if (album.userId === user.id) {
    await album.destroy()
    res.statusCode = 200
      res.json({
        message:"Successfully deleted",
        statusCode:res.statusCode})
  }
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
router.post('/', restoreUser, requireAuth, validateAlbum,async(req, res)=>{
  const {user} = req
  const {title, description, imageUrl} = req.body
  //check validation error
  const newAlbum = await Album.create({
    userId:user.id,
    title,
    description,
    previewImage:imageUrl
  })
  res.json(newAlbum)
})
//get details of an album from an id
router.get('/:albumId', async (req, res)=>{
  const {albumId} = req.params
  const album = await Album.findByPk(albumId, {
    include:[
      {model:User, as:'Artist',
        attributes:['id', 'username','previewImage']
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
  const albums = await Album.findAll({
    include:[
      {model:User, as:'Artist',
        attributes:['id', 'username','previewImage']
      },
      {model:Song}
    ]
  })
  res.json({Albums:albums})
})


module.exports = router;
