const fs = require('fs');
const {
  messages,
  dataSource,
  totalmessages,
  messagesModelData
} = require('../../models/messages.model');

function getmessageagainstid(req, res) {
  const result = messages.find((item) =>{
    if(item.id === Number(req.params.id))
    return item
 });
 if (!result) {
   res.json({
     message: 'comments not found',
   })
   return;
 }
 res.json({
   data: result,
 })
}

function getComments(req, res) {
  const result = messages.find((item) =>{
     if(item.id === Number(req.params.id))
     return item
  });
  if (!result) {
    res.json({
      message: 'comments not found',
    })
    return;
  }
  res.json({
    data: result.comments,
  })
}



function postComment(req, res) {
  const id = Number(req.params.id);
  const filteredMessageIndex = messages.findIndex(item => {
    return item.id === id;
  })
  if (filteredMessageIndex === -1) {
    res.status(400).json({
      message: 'Post not found',
    })
    return;
  }
  const existingMessage = messages[filteredMessageIndex];
  const { content, author, date} = req.body;
  const updateComment = {
    id: existingMessage.comments.length+1,
    content,
    author,
    date
  }
  messages[filteredMessageIndex].comments.push(updateComment)
  fs.writeFileSync(dataSource, JSON.stringify({
    ...messagesModelData,
    messages: [...messages]
  }));
  res.json({
    data: updateComment,
    message: 'Comment posted',
  })
}

function deleteComment(req, res) {
  const id = Number(req.params.id);

  const filteredMessageIndex = messages.findIndex(item => {
    return item.id === id;
  })


  if (filteredMessageIndex === -1) {
    res.status(400).json({
      message: 'Post not found',
    });
    return;
  }
  const existingMessage = messages[filteredMessageIndex];

  const comment_id=Number(req.params.comment_id);

  const filteredCommentforMessageIndex=existingMessage.comments.findIndex(item=>{
    return item.id===comment_id;
  })

  if (filteredCommentforMessageIndex === -1) {
    res.status(400).json({
      message: 'Comment not found for this post',
    });
    return;
  }
  messages[filteredMessageIndex].comments=messages[filteredMessageIndex].comments.filter((item,id)=>{
    if(filteredCommentforMessageIndex!==id)
    return item;
  })
  

  fs.writeFileSync(dataSource, JSON.stringify({
    ...messagesModelData,
    messages: [...messages]
  }));

  res.json({
    message: 'Comment deleted',
  })
}

module.exports = {
  getmessageagainstid,
  getComments,
  postComment,
  deleteComment
}