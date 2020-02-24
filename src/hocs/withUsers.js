import React from 'react';
import { getUsers } from '../services/GuideonService'

const withUsers = (WrappedComponent) => {
  class HOC extends React.Component {

    state = {
      users: []
    }

    componentDidMount() {
      getUsers()
        .then(users => {
          this.setState({
            users: users
          })
        })
    }

    render() {
      return (
        <WrappedComponent {...this.props} users={this.state.users} />
      );
    }
  }

  return HOC;
};

export default withUsers;