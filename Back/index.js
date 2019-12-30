import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';
import SocketService from './services/socket.service';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('running');
});

const server = http.Server(app);
const socket = io(server);

socket.on('connection', (socket) => {
  console.log('a user connect');
  
  socket.on('disconnect', () => {
    console.log('a user disconnect');
  });

  socket.on('connect-user', (data) => {
    console.log(data);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, async () => {
  console.log(`Server is up on port ${port}`);
});