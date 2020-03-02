import React from 'react';
import { getPendingMeetings } from '../services/GuideonService'

const withPendingMeetings = (WrappedComponent) => {
  class HOC extends React.Component {

    state = {
      meetings: []
    }

    componentDidMount() {
      getPendingMeetings()
        .then(meetings => {
          this.setState({ meetings })
        })
    }

    render() {
      return (
        <WrappedComponent {...this.props} meetings={this.state.meetings} />
      );
    }
  }

  return HOC;
};

export default withPendingMeetings;