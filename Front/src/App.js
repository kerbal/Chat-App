import React from 'react';
import Main from './components/MainPage/Main';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Register from './components/AuthenticationPage/Register';
import Login from './components/AuthenticationPage/Login';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/chat' component={Main}/>
        <Route exact path='/chat/:id' component={Main}/>
      </Switch>
    </Router>
  );
}

export default App;
