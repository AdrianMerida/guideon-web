import React from 'react';
import { getConversations } from '../services/GuideonService'

const withConversations = (WrappedComponent) => {
  class HOC extends React.Component {

    state = {
      conversations: []
    }

    componentDidMount() {
      getConversations()
        .then(conversations => {
          this.setState({ conversations: conversations })
        })
    }

    render() {
      return (
        <WrappedComponent {...this.props} conversations={this.state.conversations} />
      );
    }
  }

  return HOC;
};

export default withConversations;