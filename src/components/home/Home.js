import React from 'react'
import  withUsers  from '../../hocs/withUsers'
import Map from '../map/Map'

const Home = ({users}) => (
  <Map users={users}/>
)

export default withUsers(Home)