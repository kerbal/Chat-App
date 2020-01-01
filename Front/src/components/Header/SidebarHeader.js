import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import CookieService from '../../services/cookie.service';
import { history } from '../../App';

const SideBarHeader = () => {
  const signout = () => {
    CookieService.remove('kerbal-chat-session');
    history.push('/');
  }

  return (
    <div>
      <div className="text-center my-3">
        <h2><strong>Chat App</strong></h2>
      </div>
      <div className="d-flex justify-content-between p-3">
        <h4>
          {
            CookieService.getInfo('username')
          }
        </h4>
        <h4 style={{cursor: "pointer"}}>
          <span className="fas fa-sign-out-alt" onClick={signout}/>
        </h4>
      </div>
    </div> 
  )
}

export default SideBarHeader;