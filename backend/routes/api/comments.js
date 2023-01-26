const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');
const router = express.Router();

//delete comment
router.delete('/:commentId', restoreUser, requireAuth, async (req, res)=>{
  const commentId = req.params.commentId
  const userId = req.user.id
  const comment = await Comment.findByPk(commentId)
  if(!comment) {
    res.statusCode = 404
    return res.json({
      message: 'Comment couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (userId!==comment.userId){
    res.statusCode = 401
    return res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }

    await comment.destroy()
    res.statusCode = 200
    return res.json({
      message:"Successfully deleted",
      statusCode:res.statusCode})

})

//edit comment
router.put('/:commentId', restoreUser, requireAuth, async (req, res)=>{
  const commentId = req.params.commentId
  const userId = req.user.id
  const {body} = req.body
  const comment = await Comment.findByPk(commentId)
  if (!body) {
    return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: {
            body: "Comment body text is required"
        }
    })
  }
  if(!comment){
    res.statusCode = 404
    return res.json({
      message: 'Comment couldn\'t be found',
      statusCode: res.statusCode,
    })
  }
  if (comment.userId!==userId){
    res.statusCode = 401
    return res.json({
      statusCode: res.statusCode,
      message: 'Unauthorized'
    })
  }
  if(body){
    comment.body = body
    await comment.save()
  }
  return res.json(comment)
})

//create comment for song via songId
// router.post('/:songId/comments', async (req, res)=>{
//   const {songId} = req.params
//   const user = req.user

//   const song = await Song.findByPk(songId)
//   if (!song) {
//     res.statusCode = 404
//     return res.json({
//       message: 'Song couldn\'t be found',
//       statusCode: res.statusCode,
//     })
//   }
//   const comment = await Comment.create({
//     userId: user.id,
//     body:req.body.comment,
//     songId:songId
//   })
//   return res.json(comment)
// })

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
  return res.json({comments})
})


module.exports = router;
