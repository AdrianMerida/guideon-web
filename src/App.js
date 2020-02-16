import React from 'react';
import './App.css';
import Login from './components/login/login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
