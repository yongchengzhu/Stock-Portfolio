//------------------------------------------------------------------------------------------------
// External Dependencies
//------------------------------------------------------------------------------------------------
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const express    = require('express');
const morgan     = require('morgan')
const http       = require('http');
const cors       = require('cors');


//------------------------------------------------------------------------------------------------
// Internal Dependencies
//------------------------------------------------------------------------------------------------
const router = require('./router');
const keys   = require('./config/keys.js');

//------------------------------------------------------------------------------------------------
// Database Setup
//------------------------------------------------------------------------------------------------
console.log("mongoURI: ", keys.mongoURI);

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Fix deprecation warnings.
mongoose.set('useCreateIndex', true);

//------------------------------------------------------------------------------------------------
// App Setup
//------------------------------------------------------------------------------------------------

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

router(app);

//------------------------------------------------------------------------------------------------
// Production Setup
//------------------------------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  console.log('Loaded static from: client/build');
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//------------------------------------------------------------------------------------------------
// Server Setup
//------------------------------------------------------------------------------------------------

const server = http.createServer(app);
const port   = process.env.PORT || 3090;

server.listen(port);
console.log('Server is listening on port:', port);
