const express = require('express')
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;
  console.log('Client connected...')
  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    console.log(`Got the following data: ${data}`);
  });

  socket.on('add user', username => {
    console.log('Adding user...')
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    })
  })

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected...')
    if (addedUser) {
      --numUsers;
      socket.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  });
})
server.listen(port, () => console.log(`Rainbow game listening on port ${port}!`));