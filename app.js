const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require("mongoose");

const cookieParser = require('cookie-parser');
//var logger = require('morgan');

let socket = require("socket.io");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Setting up server
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/textgame", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true
}); // MongoClient.connect(url, {useNewUrlParser: true } )
mongoose.Promise = global.Promise;

let port = process.env.port || 4000;

let server = app.listen(port, () => {
  console.log(`Listening to requests on port ${port}\n`);
});

// Socket setup
let io = socket(server);

io.on("connection", (socket) => {

  console.log("Made socket connection.", socket.id);

  // FIXME Does not work as expected
  socket.on("announce", (name) => {
    io.sockets.emit("announce", name);
    console.log(name);
  })
  
  socket.on("chat", (data) => {

    io.sockets.emit("chat", data);
    console.log(data);
    
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO Check if these middlewares are needed. Remove them if not.
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error handling middleware (needs to be last)
app.use((err, req, res, next) => {
  console.error(err);

  res.status(422).send({
    error: err.message
  });

});


/* 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
