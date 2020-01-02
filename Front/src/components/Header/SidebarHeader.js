import React from 'react';
import CookieService from '../../services/cookie.service';
import { history } from '../../App';
import SearchBox from './SearchBox';

const SideBarHeader = () => {
  const signout = () => {
    CookieService.remove('kerbal-chat-session');
    history.push('/');
  }

  return (
    <div>
      <div className="text-center mt-3">
        <h2><strong><span className="far fa-comments"/> Chat App <span className="far fa-comments"/></strong></h2>
        <hr className="mb-0"/>
      </div>
      <div className="d-flex justify-content-between p-3">
        <h5 className="my-auto">
          <strong>
            {
              CookieService.getInfo('username')
            }
          </strong>
        </h5>
        <h7 style={{cursor: "pointer"}} className="my-auto">
          <em onClick={signout}>log out</em>
        </h7>
      </div>
      <hr className="mt-0"/>
      <div>
        <SearchBox/>
      </div>
    </div> 
  )
}

export default SideBarHeader;