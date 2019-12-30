import React from 'react';
import io from 'socket.io-client';

export const SocketContext = React.createContext();

class SocketProvider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      socket: undefined
    };
  }

  render () {
    return (
      <SocketContext.Provider value={this.state}>
        { this.props.children }
      </SocketContext.Provider>
    )
  }

  async componentDidMount () {
    const username = window.prompt('username?');
    const socket = io('localhost:3001')
    socket.emit('connect-user', {
      username
    });
    this.setState({
      socket
    });
  }
}

export default SocketProvider;