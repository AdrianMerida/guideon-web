import React from 'react'
import './Chat.css'
import { getUserDetail, sendMsg } from '../../services/GuideonService'
import { withRouter, Redirect } from 'react-router';
import SingleChat from './SingleChat';

class Chat extends React.Component {

  state = {
    chats: [],
    closeConversation: false,
    loading: false,
    otherUser: null,
    msg: null
  }

  componentDidMount() {
    const id = this.props.match.params.userId
    getUserDetail(id)
      .then(user => {
        this.setState({ otherUser: user })
      })

    // if (this.state.chats.length) {
    //   getChat(this.state.chats[0].conversationId)
    //     .then(chats => {
    //       console.log(chats)
    //       this.setState({ chats: chats })
    //     })
    // }
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
            this.setState({ loading: false, chats: [...this.state.chats, chat] })
            console.log(this.state.chats)
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

        <div className="chat-conversation">
          <div className="chat-conversation-chats">
            {this.state.chats.map((chat, i) => <SingleChat chat={chat} key={i} />)}
          </div>

          <form className="chat-conversation-form" onSubmit={this.handleSubmit}>
            <textarea
              name="msg"
              onChange={this.handleChange}
              type="string"
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

export default withRouter(Chat)