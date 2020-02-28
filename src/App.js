import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import SignUp from './components/signUp/SignUp';
import Login from './components/login/Login';
import Conversation from './components/chat/Conversation';
import Chat from './components/chat/Chat';

// DUDAS
// 1- AL HACER LOGOUT, COMO HAGO PARA QUE SE CIERRE EL MENU CON EL SETTIMOUT
// 2- COMO VUELVO A DONDE ESTABA (AL CERRAR UNA CONVERSACIÓN)
// 3- EN SINGLE CHATS , COMO OCULTAR EL PLACEHOLDER AL HACER FOCUS
// 4- COGER FECHA Y HORA DE ISODATE
// 5- NO ME HACE EL POST AL ENVIAR MENSAJE

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
            <SignUp />
          </Route>

          <AuthenticatedRoute exact path='/'>
            <Home />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/myProfile">
            <Profile />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/chats">
            <Conversation />
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/meetings">
            {/* PENDIENTE */}
          </AuthenticatedRoute>

          <AuthenticatedRoute exact path="/chats/:userId">
            <Chat />
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
