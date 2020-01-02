import React, { useContext } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { ConversationContext } from '../../contexts/conversation.context';

const SingleSearch = (props) => {
  const { addConversation } = useContext(ConversationContext);
  
  const onAdd = async () => {
    await addConversation(props.user);
  }

  return (
    <div className="p-3 single-chat-item">
      <Row>
        <Col sm={2}><Image fluid src="user-icon.png"/></Col>
        <Col sm={8} className="d-flex flex-column justify-content-center">
          <strong>
            { props.user.Username }
          </strong>
        </Col>
        <Col sm={2} className="d-flex flex-column justify-content-center text-center" onClick={onAdd}>
          <span className="fas fa-paper-plane"/>
        </Col>
      </Row>
    </div>
  );
}

export default SingleSearch;