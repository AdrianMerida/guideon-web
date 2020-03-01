import React from 'react';
import { getChat } from '../services/GuideonService'

const withChats = (WrappedComponent) => {
  class HOC extends React.Component {

    clearChatRefresh = () => {
       clearInterval(this.intervalId)
    }

    state = {
      chats: [],
    }

    componentDidMount() {
      this.intervalId = setInterval(this.getChats, 2000)
    }

    getChats = () => {
      const conversationId = this.props.match.params.conversationId
      getChat(conversationId)
        .then(chats => {
          this.setState({ chats: chats })
        })
    }

    componentWillUnmount() {
      this.clearChatRefresh()
    }

    render() {
      return (
        <WrappedComponent {...this.props} chats={this.state.chats} clearChatRefresh={this.clearChatRefresh} />
      );
    }
  }

  return HOC;
};

export default withChats;