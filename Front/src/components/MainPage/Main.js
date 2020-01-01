import React, { useContext } from 'react';
import SocketProvider, { SocketContext } from '../../contexts/socket.context';
import { Container, Row, Col } from 'react-bootstrap';
import SideBarHeader from '../Header/SidebarHeader';
import ConversationProvider from '../../contexts/conversation.context';
import ChatList from '../ChatList/ChatList';
import ChatBox from '../ChatBox/ChatBox';

const Main = (props) => {
  return (
    <SocketProvider>
    <ConversationProvider>
      <Container fluid className="main-window">
        <Row style={{height: "100%"}}>
          <Col md={3} lg={3} className="sidebar shadow-sm p-0">
            <SideBarHeader/>
            <hr className="m-0"/>
            <ChatList/>
          </Col>
          <Col md={9} lg={9} className="p-0">
            <ChatBox {...props}/>
          </Col>
        </Row>
      </Container>
    </ConversationProvider>
    </SocketProvider>
  )
}

export default Main;