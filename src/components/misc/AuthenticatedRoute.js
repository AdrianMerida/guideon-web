import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const AuthenticatedRoute = (props) => {
  if (!props.currentUser) {
    return <Redirect to="/login" />
  } else {
    return <Route {...props} />
  }
}

export default WithAuthConsumer(AuthenticatedRoute)
