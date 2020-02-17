import React from 'react';
import Login from './components/login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <AuthenticatedRoute exact path='/'>
          <Home />
        </AuthenticatedRoute>
        <Redirect to="/login" />
      </Switch>
    </div>
  );
}

export default App;
