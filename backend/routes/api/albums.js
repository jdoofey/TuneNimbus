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
//create an album
router.post('/', restoreUser, requireAuth, async(req, res)=>{
  
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
