import React from 'react';
import Login from './components/login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';
import Register from './components/register/Register';
import Map from './components/misc/Mapbox';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">

      <div className="navbar">
        <Navbar />
      </div>

      <div className="rest-application">
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <AuthenticatedRoute exact path='/'>
            <Home />
          </AuthenticatedRoute>
          <Route exact path='/mapbox'>
            <Map />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
