import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'

const Home = ({currentUser}) => (
  <div>{JSON.stringify(currentUser)}</div>
)

export default WithAuthConsumer(Home)