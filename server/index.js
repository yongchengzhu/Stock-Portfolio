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

//------------------------------------------------------------------------------------------------
// Database Setup
//------------------------------------------------------------------------------------------------

mongoose.connect('mongodb://localhost:stock/stock', { useNewUrlParser: true });

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
// Server Setup
//------------------------------------------------------------------------------------------------

const server = http.createServer(app);
const port   = process.env.PORT || 3090;

server.listen(port);
console.log('Server is listening on port:', port);
