import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';
import { sequelize } from './config/sequelize';
import route from './api';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

app.use(route);

app.get('/', (req, res) => {
  res.status(200).send('running');
});

const server = http.Server(app);
export const _io = io(server);
export const socket = _io;

socket.on('connection', (socket) => {
  socket.on('disconnect', () => {

  });

  socket.on('connect-user', (data) => {
    socket.join(`room-${data.UserId1}-${data.UserId2}`);
  });

  socket.on('connect-user-conversation', (data) => {
    console.log(data);
    socket.join(`conversation-${data.UserId}`);
  })
});

const port = process.env.PORT || 3001;
server.listen(port, async () => {
  sequelize.authenticate().then(() => {
    console.log('Database connected');
    console.log(`Server is up on port ${port}`);
  })
});