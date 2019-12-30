import React from 'react';


import SocketProvider from './contexts/socket.context';
import Main from './components/MainPage/Main';
import Header from './components/MainPage/Header/Header';

function App() {
  return (
    <div>
      {/* <SocketProvider>
        <Main/>
      </SocketProvider> */}
      <Header/>
    </div>
  );
}

export default App;
