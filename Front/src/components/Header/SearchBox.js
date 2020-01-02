import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import UserService from '../../services/user.service';
import Loading from '../Loading/Loading';
import SingleSearch from './SingleSearch';

const SearchBox = () => {
  const ref = React.createRef();
  const [ timer, setTimer ] = useState(undefined);
  const [ loading, setLoading] = useState(false);
  const [ users, setUsers] = useState([]);

  const onChange = () => {
    setLoading(true);
    clearTimeout(timer);
    const value = ref.current.value.trim();
    if(value === '') {
      setUsers([]);
      setLoading(false);
      return;
    }
    setTimer(setTimeout(async () => {
      const users = await UserService.search(value);
      setUsers(users);
      setLoading(false);
    }, 500));
  }

  return (
    <div className="pb-3">
      <InputGroup className="px-3 pb-3">
        <InputGroup.Prepend>
          <InputGroup.Text><span className="fas fa-search"/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          ref={ref}
          placeholder="username or email"
          onChange={onChange}
        />
      </InputGroup>
      {
        loading &&
        <div>
          <br/>
          <Loading/>
        </div>
      }
      {
        users.length > 0 &&
        <div>
          {
            users.map(u => (
              <SingleSearch user={u} key={u.username}/>
            ))
          }
        </div>
      }
    </div>
  )
}

export default SearchBox;