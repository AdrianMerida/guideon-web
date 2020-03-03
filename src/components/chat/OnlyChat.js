import React from 'react'
import './Chat.css'
import { sendMsg, getChat, getConversationId } from '../../services/GuideonService'
import SingleChat from './SingleChat';
import { WithAuthConsumer } from '../../contexts/AuthContext'

class OnlyChat extends React.Component {

  state = {
    loading: false,
    otherUser: null,
    msg: '',
    conversation: null,
    chats: []
  }

  componentDidMount() {

    if (this.props.meeting.sender.id.toString() === this.props.currentUser.id.toString()) {
      this.setState({ otherUser: this.props.meeting.receiver })
    } else {
      this.setState({ otherUser: this.props.meeting.sender })
    }
  }

  getChats = () => {
    getChat(this.state.conversation.id)
      .then(chats => {
        this.setState({ chats: chats })
      })
  }

  closeConversation = () => {
    clearInterval(this.intervalId)
    this.props.onClickHide()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true }, () => {
      sendMsg(this.state.otherUser.id, this.state)
        .then(
          (chat) => {
            this.setState({ loading: false, msg: '' })
          },
          (error) => {
            this.setState({ loading: false })
          })
    })
  }

  onClickMessage = (e) => {
    e.target.placeholder = ''
  }

  onBlurMessage = (e) => {
    e.target.placeholder = 'Write a message...'
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {

    if (!this.state.otherUser) {
      return <div>Loading conversation...</div>
    }

    if (!this.state.conversation && this.state.otherUser) {
      getConversationId(this.state.otherUser.id)
        .then(conversation => {
          if (conversation) {
            this.setState({ conversation: conversation })
          }
        })
    }

    if (this.state.conversation && !this.intervalId) {
      this.intervalId = setInterval(this.getChats, 2000)
    }

    return (
      <div className={`chat-container`}>

        <div className="chat-information">
          <div className="chat-information-title">
            <img src={this.state.otherUser.avatarUrl} alt="avatar" />
            <strong>{this.state.otherUser.name}</strong>
          </div>
          <button onClick={this.closeConversation} className="fa fa-window-close fa-2x"></button>
        </div>

        <div id="chat-conversation" className="chat-conversation">
          <div className="chat-conversation-chats">
            {this.state.chats.map((chat, i) => <SingleChat chat={chat} key={i} />)}
          </div>

          <form className="chat-conversation-form" onSubmit={this.handleSubmit}>
            <textarea
              name="msg"
              onChange={this.handleChange}
              type="string"
              value={this.state.msg}
              className="chat-conversation-message"
              placeholder="Write a message..."
              onClick={this.onClickMessage}
              onBlur={this.onBlurMessage}
            >
            </textarea>

            <button type="submit" className="fa fa-paper-plane fa-2x chat-conversation-send-message" />

          </form>
        </div>
      </div>
    )
  }
}

export default WithAuthConsumer(OnlyChat)