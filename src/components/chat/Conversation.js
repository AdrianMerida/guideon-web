import React from 'react'
import './Conversation.css'
import withConversations from '../../hocs/withConversations'
import { WithAuthConsumer } from '../../contexts/AuthContext'

import SingleConversation from './SingleConversation'

const Conversation = ({ conversations, currentUser }) => {

  if (!conversations.length) {
    return <div>Loading...</div>
  }

  const usersConversations = conversations.map((conversation, i) => ({
    chats: conversation.chats,
    user: conversation.users.find(user => user.id !== currentUser.id)
  }))
  console.log(usersConversations)
  return (

    <div className="conversations">
      {usersConversations.map((conversation, i) =>
        <div className="conversation-container" key={i}>
          <div className="conversation-img">
            {/* <img src=""></img> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default WithAuthConsumer(withConversations(Conversation))