import React from 'react'
import withUsers from '../../hocs/withUsers'
import Map from '../map/Map'

const Home = ({ users }) => {
  if (users.length) {
    return <Map users={users} />
  }
  return null
}

export default withUsers(Home)