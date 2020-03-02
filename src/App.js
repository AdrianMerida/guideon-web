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
import SearchMeeting from './components/meeting/SearchMeeting';

// DUDAS
// 1 => LA PUTA PETICION A LA API SEARCHMEATING NO RECIVE EN EL REQ.BODY NADA!!!!!!!!!!!
// 3 => DIV SCROLLDOWN BOT => https://jsfiddle.net/nex1oa9a/1/
// 4 => QUERY FILTRAR MEETING ( no funciona el criteria https://github.com/naturet/proyect/blob/master/controllers/experiences.controller.js)
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
          <AuthenticatedRoute exact path="/meetings/search" component={SearchMeeting} />
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
