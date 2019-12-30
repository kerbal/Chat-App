import React, { useContext } from 'react';
import { SocketContext } from '../../contexts/socket.context';

const Main = (props) => {
  const { socket } = useContext(SocketContext);

  return (
    <div>
      Hello
    </div>
  )
}

export default Main;