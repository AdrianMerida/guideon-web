import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './SingleChat.css'

const SingleChat = ({ chat, currentUser }) => {

  const typeSender = chat.sender.toString() === currentUser.id.toString() ? 'sender-me' : 'sender-other'
  const messageDate = () => {
    const testDate = new Date(chat.createdAt)
    return testDate.getDate().toString().padStart(2, '0') + '-' + (testDate.getMonth() + 1).toString().padStart(2, '0')
  }

  return (
    <div className={`${typeSender}`}>
      <div className="message-data">
        {chat.msg}
      </div>
      <div className="message-date">
        &nbsp;({messageDate()})
      </div>
    </div>
  )
}

export default WithAuthConsumer(SingleChat)