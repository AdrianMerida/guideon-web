import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './SingleChat.css'

const SingleChat = ({ chat, currentUser }) => {

  const typeSender = chat.sender.toString() === currentUser.id.toString() ? 'sender-me' : 'sender-other'
  // .toISOString().split('T')[0],
    return (
      <div className={`${typeSender}`}>
        {chat.msg} <span>{chat.createdAt}</span>
      </div>
    )
}

export default WithAuthConsumer(SingleChat)