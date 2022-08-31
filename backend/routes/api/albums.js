const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();

//get all albums via artistId

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
//get all albums
router.get('/', async (req, res) =>{
  const albums = await Album.findAll()
  res.json({Albums:albums})
})


module.exports = router;
