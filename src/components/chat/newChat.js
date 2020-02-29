import React from 'react'
import './Chat.css'
import { sendMsg, getOneConversation } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom';
import SingleChat from './SingleChat';
import withChats from '../../hocs/withChats'
import { WithAuthConsumer } from '../../contexts/AuthContext'

class NewChat extends React.Component {

  state = {
    closeConversation: false,
    loading: false,
    otherUser: null,
    msg: ''
  }

  componentDidMount() {
    const conversationId = this.props.match.params.conversationId
    getOneConversation(conversationId)
      .then(conversation => {
        const otherUser = conversation.users.find(user => user.id !== this.props.currentUser.id)
        this.setState({ otherUser: otherUser })
      })
  }

  closeConversation = () => {
    this.setState({ closeConversation: true })
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

       if (this.state.closeConversation) {
      return <Redirect to="/" />
    }

    if (!this.state.otherUser) {
      return <div>Loading...</div>
    }

    const closeClass = this.state.closeConversation ? 'close-conversation' : ''

    return (
      <div className={`chat-container ${closeClass}`}>

        <div className="chat-information">
          <div className="chat-information-title">
            <img src={this.state.otherUser.avatarUrl} alt="avatar" />
            <strong>{this.state.otherUser.name}</strong>
          </div>
          <button onClick={this.closeConversation} className="fa fa-window-close fa-2x"></button>
        </div>

        <div id="chat-conversation" className="chat-conversation">
          <div className="chat-conversation-chats">
            {this.props.chats.map((chat, i) => <SingleChat chat={chat} key={i} />)}
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

export default WithAuthConsumer(withChats(NewChat))