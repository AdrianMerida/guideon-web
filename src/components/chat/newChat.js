import React from 'react'
import './Chat.css'
import { sendMsg, getOneConversation, existConversation } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom';
import SingleChat from './SingleChat';
import withChats from '../../hocs/withChats'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import PrivateMessage from './PrivateMessage';

class NewChat extends React.Component {

  state = {
    closeConversation: false,
    loading: false,
    otherUser: null,
    msg: '',
    privateMessage: false,
    converId: ''
  }

  componentDidMount() {
    const conversationId = this.props.match.params.conversationId
    getOneConversation(conversationId)
      .then(conversation => {
        if (!conversation) {
          //  SI NO ENCUENTRA, ES PORQUE ES UN MENSAJE A UN USUARIO
          //  HAY QUE VER SI YA EXISTE CONVERSACIÓN ENTRE ELLOS
          existConversation(conversationId)
            .then(conver => {
              if (!conver) {
                this.setState({ privateMessage: true })
              } else {
                // SI ENTRA DESDE EL MAPBOX
                const converId = conver.chats.conversationId;
                this.setState({converId: converId})
                // getOneConversation(converId)
                //   .then(conv => {
                //     const otherUser = conv.users.find(user => user.id !== this.props.currentUser.id)
                //     this.setState({ otherUser: otherUser })
                //   })
              }
            })
        }

        // SI ENTRA DESDE CHATS
        if (conversation) {
          const otherUser = conversation.users.find(user => user.id !== this.props.currentUser.id)
          this.setState({ otherUser: otherUser })
        }
      })
  }

  hidePrivateMessage = () => {
    this.setState({ privateMessage: false })
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

    if (this.state.privateMessage) {
      this.props.clearChatRefresh()
      const conversationId = this.props.match.params.conversationId
      return <PrivateMessage
        currentUser={this.props.currentUser}
        id={conversationId}
        onClickHide={this.hidePrivateMessage} />
    }

    if (this.state.converId) {
      console.log('redirected')
      return <Redirect to={`/conversations/${this.state.converId}`} />
    }
  
    if (!this.state.otherUser) {
      return <div>Loading...wey</div>
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