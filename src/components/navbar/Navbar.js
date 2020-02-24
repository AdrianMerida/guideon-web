import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './Navbar.css'
import { switchAvailability, switchUserState } from '../../services/GuideonService'
import { Link, Redirect } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    available: this.props.currentUser ? this.props.currentUser.available : true,
    status: this.props.currentUser ? this.props.currentUser.state : 'offer',
    loading: false,
    showMenu: false
  }

  changeAvailability = (e) => {
    e.preventDefault()
    this.setState({ loading: true, available: !this.props.currentUser.available }, () => {
      switchAvailability()
        .then(
          (user) => {
            this.props.setUser(user)
          },
          () => {
            this.setState({ error: true, loading: false })
          })
    })
  }

  changeStatus = (e) => {
    e.preventDefault()

    const states = {
      offer: 'demand',
      demand: 'offer'
    }

    this.setState({ loading: true, available: states[this.state.status] }, () => {
      switchUserState()
        .then(
          (user) => {
            this.props.setUser(user)
          },
          () => {
            this.setState({ error: true, loading: false })
          })
    })
  }

  showMenu = (e) => {
    e.preventDefault()
    this.setState({ showMenu: !this.state.showMenu })
  }

  hideMenu = (e) => {
    e.preventDefault()
    this.setState({ showMenu: false })
  }


  // goToProfile = (e) => (<Redirect to='/myProfile' />)


  render() {

    const availableClass = this.state.available ? 'online' : 'offline'

    return (
      <div className="navbar-container">

        <div className="navbar-brand">
          <a className="text-green" href="/">
            <i className="hp-5 fa fa-glide" />
            <strong>GUIDEON</strong>
          </a>
        </div>

        {this.props.currentUser && (

          <div className="navbar-logged">

            <div className="navbar-user-state">
              <div className="navbar-welcome text-center">
                Have a nice day <strong>{this.props.currentUser.name}</strong>!
              </div>
              <div className="navbar-welcome text-center">
                You are currently as <strong>{this.props.currentUser.state}</strong>!
              </div>
            </div>

            <div onClick={this.changeAvailability} className={`hm-5 navbar-available ${availableClass}`} />

            <div className="navbar-dropdown">
              <button onClick={this.showMenu} className="navbar-avatar">
                <img src={this.props.currentUser.avatarUrl} alt="" />
              </button>
              {this.state.showMenu && (
                <div className="navbar-dropdown-content">
                  <Link className="navbar-dropdown-option p-5" to="/myProfile">Profile</Link>
                  <Link className="navbar-dropdown-option p-5" to="/chats">Chats</Link>
                  <div className="navbar-dropdown-option p-5" onClick={this.changeStatus}>Change status</div>
                  <div className="navbar-dropdown-option p-5" onClick={this.props.logout}>Log out</div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    )
  }
}

export default WithAuthConsumer(Navbar)