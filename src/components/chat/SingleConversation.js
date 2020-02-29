import React from 'react'
import './SingleConversation.css'
import { Link } from 'react-router-dom'

const SingleConversation = ({ conversation }) => {

  const messageDate = () => {
    const testDate = new Date(conversation.chats.createdAt)
    // return testDate.getHours() + ':' + testDate.getMinutes() + '--' +
    //         testDate.getDate().toString().padStart(2, '0') + '-' + 
    //         (testDate.getMonth() + 1).toString().padStart(2, '0')
    return testDate.getDate().toString().padStart(2, '0') + '/' +
      (testDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
      testDate.getFullYear()
  }

  console.log(conversation.chats.conversationId)

  return (
    <Link to={`/chats/${conversation.chats.conversationId}`} className="conversation-container">
      <div className="conversation-img">
        <img src={conversation.otherUser.avatarUrl} alt="avatar"></img>
      </div>

      <div className="conversation-last-msg">
        <div className="conversation-title">
          <h3 className="conversation-username">{conversation.chats.sender.name}</h3>
          <p className="conversation-date">{messageDate()}</p>
        </div>
        <div className="conversation-msg">
          <p className="conversation-msg-info">{conversation.chats.msg}</p>
        </div>
      </div>
    </Link>
  )
}

export default SingleConversation