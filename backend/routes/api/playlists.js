const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const router = express.Router();

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
