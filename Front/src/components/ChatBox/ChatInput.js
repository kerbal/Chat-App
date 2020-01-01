import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ChatInput = (props) => {
  const contentRef = React.createRef();

  const onSend = async () => {
    const content = contentRef.current.value;
    await props.conversation.sendMessage(content);
    props.onRefresh();
  }

  return (
    <div className="p-2">
      <Form.Group>
        <Row>
          <Col md={11}>
            <Form.Control
              as="textarea"
              ref={contentRef}
              type="text"
              name="displayName"
              autoComplete="off"
            />
          </Col>
          <Col md={1}>
            <Button className="w-100" onClick={onSend}>
              Send
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </div>
  )
}

export default ChatInput;