const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();

//coments by song id
router.get('/:songId/comments', async(req, res)=>{
  const {songId} = req.params
  const song = await Song.findByPk(songId)
  const comments = await song.getComments({
    include:[{model:User, attributes:['id', 'username']}]
  })
  if (!song) {
    res.statusCode = 404
    res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  res.json({Comments:comments})
})

module.exports = router;
