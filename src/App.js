import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import AuthenticatedRoute from '../src/components/misc/AuthenticatedRoute';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import SignUp from './components/signUp/SignUp';
import Login from './components/login/Login';
import Conversation from './components/chat/Conversation';
import NewChat from './components/chat/NewChat';
import chatConversation from './components/chat/chatConversation';
import CreateMeeting from './components/meeting/CreateMeeting';
import Meetings from './components/meeting/Meetings';
import MeetingDetail from './components/meeting/MeetingDetail';

// DUDAS
// 1 => COMO HACER LO DEL SETTIMEOUT
// 2 => EL DATETIME PICKER ME PONE UN GMT +1 Y ME LA LÍA AL GUARDARLO EN MONGO

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

          <AuthenticatedRoute exact path="/meetings" component={Meetings} />

          <AuthenticatedRoute exact path="/meetings/create" component={CreateMeeting} />

          <AuthenticatedRoute exact path="/conversations/:conversationId" component={chatConversation} />

          <AuthenticatedRoute exact path="/chats/:conversationId" component={NewChat} />

          <AuthenticatedRoute exact path="/meetings/:meetingId" component={MeetingDetail} />

          <Redirect to="/login" />

        </Switch>
      </div>
    </div>
  );
}

export default App;
