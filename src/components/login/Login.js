import React from 'react'
import './Login.css'
import { login } from '../../services/GuideonService'
import { Link, Redirect } from 'react-router-dom';
import { WithAuthConsumer } from '../../contexts/AuthContext'

class Login extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    error: false,
    loading: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true, error: false }, () => {
      login({ ...this.state.data })
        .then(
          (user) => {
            this.props.setUser(user)
          },
          () => {
            this.setState({ error: true, loading: false })
          })
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  removeError = (event) => {
    this.setState({
      error: false
    })
  }

  render() {

    const classInvalid = this.state.error ? 'invalid-input' : ''
    const wrongCredentials = this.state.error ? 'login-wrong-credentials-show' : 'login-wrong-credentials-hide'

    if (this.props.currentUser) {
      return <Redirect to="/" />
    }

    return (

      <div className="login">
        <div className="login-container">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h1 className="login-title"><strong>WELCOME</strong></h1>

            {this.state.error &&
              <div className={`${wrongCredentials}`}>Wrong Credentials!</div>}

            <div className="login-field">
              <i className="login-icon fa fa-envelope fa-2x"></i>
              <input
                onFocus={this.removeError}
                onChange={this.handleChange}
                name="email"
                type="email"
                className={`login-input p-5 ${classInvalid}`}
                autoComplete="off"
                placeholder="Email Address">
              </input>
            </div>

            <div className="login-field">
              <i className="login-icon fa fa-lock fa-2x"></i>
              <input
                onFocus={this.removeError}
                onChange={this.handleChange}
                name="password"
                type="password"
                className={`login-input p-5 ${classInvalid}`}
                autoComplete="off"
                placeholder="Password">
              </input>
            </div>

            <button className="login-button" type="submit"><strong>Log in</strong></button>
          </form>
          <div className="login-signup" >
            Don't you have an account?
            <Link className="login-signup-message" to="/signup"><strong>&nbsp;Sign up here!</strong></Link>
          </div>
        </div>
      </div>
    )
  }

}

export default WithAuthConsumer(Login)