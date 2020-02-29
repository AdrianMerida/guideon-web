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
    otherUser: conversation.users.find(user => user.id !== currentUser.id)
  }))

  return (
      <div className="conversations">
        {usersConversations.map((conversation, i) =>
          <SingleConversation conversation={conversation} key={i} />
        )}
      </div>    
  )
}

export default WithAuthConsumer(withConversations(Conversation))