const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();

//delete comment
router.delete('/:commentId', restoreUser, requireAuth, async (req, res)=>{
  const {commentId} = req.params
  const {user} = req
  const comment = await Comment.findByPk(commentId)
  if(!comment) {
    res.statusCode = 404
    return res.json({
      message: 'Comment couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if(comment && comment.userId===user.id){
    await comment.destroy()
    res.statusCode = 200
    return res.json({
      message:"Successfully deleted",
      statusCode:res.statusCode})
  }
  if (comment.userId!==user.id){
    res.statusCode = 401
    return res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
})

//edit comment
router.put('/:commentId', restoreUser, requireAuth, async (req, res)=>{
  const {commentId} = req.params
  const {user} = req
  const {body} = req.body
  const comment = await Comment.findByPk(commentId)
  if(comment&&comment.userId===user.id){
    comment.body = body
    await comment.save()
    return res.json(comment)
  }
  if(!comment){
    res.statusCode = 404
    return res.json({
      message: 'Comment couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (comment.userId!==user.id){
    res.statusCode = 401
    return res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
})

//create comment for song via songId
router.post('/:songId/comments', async (req, res)=>{
  const {songId} = req.params
  const {user} = req
  const {body} = req.body
  const song = await Song.findByPk(songId)
  const comment = await Song.createComment({
    userId: user.id,
    body
  })
  if (!song) {
    res.statusCode = 404
    return res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  return res.json(comment)
})

//coments by song id
router.get('/:songId/comments', async(req, res)=>{
  const {songId} = req.params
  const song = await Song.findByPk(songId)
  const comments = await song.getComments({
    include:[{model:User, attributes:['id', 'username']}]
  })
  if (!song) {
    res.statusCode = 404
    return res.json({
      message: 'Song couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  return res.json({Comments:comments})
})


module.exports = router;
