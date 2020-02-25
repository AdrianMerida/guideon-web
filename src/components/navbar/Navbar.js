import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './Navbar.css'
import NavbarLogged from './NavbarLogged'
import NavbarUnlogged from './NavbarUnlogged'

const Navbar = ({ currentUser }) => {
  if (currentUser) {
    return <NavbarLogged />
  } else {
    return <NavbarUnlogged />
  }
}

export default WithAuthConsumer(Navbar)

