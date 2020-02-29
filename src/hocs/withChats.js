import React from 'react';
import { getChat } from '../services/GuideonService'

const withChats = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      chats: [],
      intervalId: null
    }

    componentDidMount() {
      this.intervalId = setInterval(this.getChats, 2000)
    }

    getChats = () => {
      const conversationId = this.props.match.params.conversationId
      getChat(conversationId)
          .then(chats => {
            this.setState({ chats: chats})
          })
    }

    componentWillUnmount() {
      clearInterval(this.intervalId)
    }

    render() {
      return (
        <WrappedComponent {...this.props} chats={this.state.chats} />
      );
    }
  }

  return HOC;
};

export default withChats;