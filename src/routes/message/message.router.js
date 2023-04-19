const messageRouter = require('express').Router();
const {
  getmessageagainstid,
  getComments,
  postComment,
  deleteComment
} = require('./message.controller');

messageRouter
  .get('/:id', getmessageagainstid)
  .get('/:id/comments', getComments)
  .post('/:id/comments', postComment)
  .delete('/:id/comments/:comment_id', deleteComment);

module.exports = messageRouter;