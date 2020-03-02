import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './Navbar.css'
import { switchAvailability, switchUserState } from '../../services/GuideonService'
import NavbarDropdown from './NavbarDropdown'
// import { useParams } from 'react-router-dom'

class NavbarLogged extends React.Component {

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
    this.setState({ showMenu: !this.state.showMenu })
  }

  hideMenu = (e) => {
    setTimeout(this.showMenu, 100)
  }

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
              {/* <div className="navbar-welcome text-center">
                You are currently as <strong>{this.props.currentUser.state}</strong>!
              </div> */}
            </div>

            <div onClick={this.changeAvailability} className={`hm-5 navbar-available ${availableClass}`} />

            <div className="navbar-dropdown">
              <button onClick={this.showMenu} onBlur={this.hideMenu} className="navbar-avatar">
                <img src={this.props.currentUser.avatarUrl} alt="" />
              </button>
              {this.state.showMenu &&
                <NavbarDropdown
                  onClickChangeStatus={this.changeStatus}
                  onClickLogout={this.props.logout}
                />
              }
            </div>

          </div>
        )}
      </div>
    )
  }
}

export default WithAuthConsumer(NavbarLogged)