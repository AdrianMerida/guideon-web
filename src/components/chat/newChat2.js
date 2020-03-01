import React from 'react'
import './Chat.css'
import { getOneConversation, existConversation } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom';
import withChats from '../../hocs/withChats'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import PrivateMessage from './PrivateMessage';

class NewChat extends React.Component {

  state = {
    loading: false,
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
                this.setState({ converId: converId })
              }
            })
        }      
      })
  }

  hidePrivateMessage = () => {
    this.setState({ privateMessage: false })
  }

  render() {

    if (this.state.privateMessage) {
      this.props.clearChatRefresh()
      const conversationId = this.props.match.params.conversationId
      return <PrivateMessage
        currentUser={this.props.currentUser}
        id={conversationId}
        onClickHide={this.hidePrivateMessage} />
    }

    if (this.state.converId) {
      return <Redirect to={`/conversations/${this.state.converId}`} />
    }

    return (
      <div></div>
    )
  }
}

export default WithAuthConsumer(withChats(NewChat))