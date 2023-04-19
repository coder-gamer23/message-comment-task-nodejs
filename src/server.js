const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const morgan = require('morgan');
const messageRouter = require('./routes/message/message.router');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(morgan('combined'));

app.use('/messages', messageRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'Not found',
  })
})

app.listen(PORT, () => {
  console.log(`Server Started. Listening on port ${PORT}`);  
})
