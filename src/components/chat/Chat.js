import React from 'react'
import './Chat.css'
import { getUserDetail, sendMsg } from '../../services/GuideonService'
import { withRouter } from 'react-router';
import SingleChat from './SingleChat';

class Chat extends React.Component {

  state = {
    chats: [],
    closeConversation: false,
    loading: false,
    otherUer: null,
    msg: null
  }

  componentDidMount() {
    const id = this.props.match.params.userId
    getUserDetail(id)
      .then(user => {
        this.setState({ otherUser: user })
      })
  }

  closeConversation = () => {
    this.setState({ closeConversation: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true }, () => {
      sendMsg(this.state.otherUser.id, this.state.msg)
        .then(
          (chat) => {
            this.setState({ loading: false, chats: [...this.state.chats, chat] })
          },
          (error) => {
            this.setState({ loading: false })
          })
    })

  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {

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

        <div className="chat-conversation">
          <div className="chat-conversation-chats">
            {this.state.chats.map(chat => <SingleChat />)}
          </div>

          <form className="chat-conversation-form" onSubmit={this.handleSubmit}>
            <textarea
              name="msg"
              onChange={this.handleChange}
              type="string"
              className="chat-conversation-message"
              placeholder="Write a message..."
            >
            </textarea>

            <button type="submit" className="fa fa-paper-plane fa-2x chat-conversation-send-message" />

          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Chat)