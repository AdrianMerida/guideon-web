import React from 'react';
import { getMeetings } from '../services/GuideonService'

const withMeetings = (WrappedComponent) => {
  class HOC extends React.Component {

    state = {
      meetings: []
    }

    componentDidMount() {
      getMeetings()
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

export default withMeetings;