import React from 'react';
import Login from './components/login/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';
import Register from './components/register/Register';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import SignUp from './components/signUp/SignUp';
import NewLogin from './components/newLogin/newlogin';

function App() {
  return (
    <div className="App">

      <div className="navbar">
        <Navbar />
      </div>

      <div className="rest-application">
        <Switch>

          <Route exact path='/login'>
            {/* <Login /> */}
            <NewLogin />
          </Route>

          <Route exact path='/signup'>
            {/* <Register /> */}
            <SignUp />
          </Route>

          <AuthenticatedRoute exact path='/'>
            <Home />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/myProfile">
            <Profile />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/chats">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/meetings">
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
