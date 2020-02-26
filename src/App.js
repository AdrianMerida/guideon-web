import React from 'react';
import Login from './components/login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';
import Register from './components/register/Register';
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

          <AuthenticatedRoute exact path="/myProfile">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/chats">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/chats/:userId">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/meetings/:userId">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <Redirect to="/login" />

        </Switch>
      </div>
    </div>
  );
}

export default App;
