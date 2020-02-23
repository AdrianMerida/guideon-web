import React from 'react'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './Navbar.css'
import { switchAvailability } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom'

class Navbar extends React.Component {

  state = {
    available: this.props.currentUser.available,
    loading: false
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

  goToProfile = (e) => (<Redirect to='/myProfile' />)


  render() {

    const availableClass = this.state.available ? 'online' : 'offline'

    return (
      <div className="navbar-container">
        <div className="navbar-brand">
          <a className="text-green" href="/">
            <i className="hp-5 fa fa-glide" />
            GUIDEON
          </a>
        </div>

        {this.props.currentUser && (
          <div className="navbar-logged">
            <div onClick={this.changeAvailability} className={`navbar-available ${availableClass}`}>
            </div>

            <div onClick={this.goToProfile} className={`navbar-avatar`}>
              <img src={this.props.currentUser.avatarUrl} alt="" />
            </div>

            <div onClick={this.props.logout} className="navbar-logout">
                <i className="fa fa-power-off" />
            </div>
          </div>
        )}

      </div>
    )
  }
}

export default WithAuthConsumer(Navbar)