import React from 'react'
import { Link } from 'react-router-dom'

const NavbarDropdown = ({ onClickChangeStatus, onClickLogout}) => (
  <div className="navbar-dropdown-content">
    <Link className="navbar-dropdown-option p-5" to="/myProfile">Profile</Link>
    <Link className="navbar-dropdown-option p-5" to="/chats">Chats</Link>
    <div className="navbar-dropdown-option p-5" onClick={onClickChangeStatus}>Change status</div>
    <div className="navbar-dropdown-option p-5" onClick={onClickLogout}>Log out</div>
  </div>
)

export default NavbarDropdown