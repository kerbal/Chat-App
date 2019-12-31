import express from 'express';
import AuthenticationService from '../services/authentication.service';
import UserService from '../services/user.service';
import ConversationSerivce from '../services/conversation.service';
import verifyUser from '../middleware/verifyUser';
import TokenService from '../services/token.service';

const route = express.Router();

route.post('/register', async (req, res) => {
  try {
    const response = await AuthenticationService.register(req.body.email, req.body.username, req.body.password);
    if(response) {
      throw new Error(response);
    }
    res.status(200).send({
      message: 'user created!'
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.put('/login', async (req, res) => {
  try {
    const response = await AuthenticationService.login(req.body.loginName, req.body.password);
    if(typeof response === 'string') {
      throw new Error(response);
    }
    res.status(200).send({
      token: response.token
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.get('/search', verifyUser, async (req, res) => {
  try {
    const users = await UserService.search(req.query.pattern);
    res.status(200).send({
      users
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.post('/conversation', verifyUser, async (req, res) => {
  try {
    const { userId } = await TokenService.decodeToken(req.headers.authorization);
    const response = await ConversationSerivce.startConversation(userId, req.body.userId2);
    if(response) {
      throw new Error(response);
    }
    res.status(200).send({
      message: 'conversation created!'
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.get('/conversations', verifyUser, async (req, res) => {
  try {
    const { userId } = await TokenService.decodeToken(req.headers.authorization);
    const response = await ConversationSerivce.getConversations(userId);
    res.status(200).send({
      conversations: response
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.post('/conversation/:id', verifyUser, async (req, res) => {
  try {
    const { userId } = await TokenService.decodeToken(req.headers.authorization);
    const response = await ConversationSerivce.addMesage(req.params.id, userId, req.body.content);
    if(response) {
      throw new Error(response);
    }
    res.status(200).send({
      message: 'message added!'
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

route.get('/conversation/:id', verifyUser, async (req, res) => {
  try {
    const { userId } = await TokenService.decodeToken(req.headers.authorization);
    const response = await ConversationSerivce.getMessages(userId, req.params.id);
    res.status(200).send({
      messages: response
    });
  }
  catch (error) {
    res.status(400).send({
      message: error.message
    });
  }
});

export default route;