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

    if (this.props.currentUser) {
      return <Redirect to="/" />
    }

    return (
      <div className="login">
        <div className="login-container">

          <form className="login-form" onSubmit={this.handleSubmit}>
            <h1 className="login-title">GUIDEON</h1>

            {this.state.error && <div className={`text-center p-5 ${classInvalid}`}>Wrong Credentials!</div>}
            <div className="login-credentials">

              <div className="login-component vp-10">
                <label className="login-label vp-10" htmlFor="email">Email</label>
                <input
                  onFocus={this.removeError}
                  onChange={this.handleChange}
                  className={`login-input p-5 ${classInvalid}`}
                  autoComplete="off"
                  name="email"
                  type="email"
                  id="login-email"
                  placeholder="Enter your email..."
                />
              </div>

              <div className="login-component">
                <label className="login-label vp-10" htmlFor="password">Password</label>
                <input
                  onFocus={this.removeError}
                  onChange={this.handleChange}
                  className={`login-input p-5 ${classInvalid}`}
                  name="password"
                  type="password"
                  id="login-password"
                  placeholder="Enter your password..."
                />
              </div>

              <div className="login-component">
                <div className="login-buttons">
                  <button type="submit" className="login-button p-5" disabled={this.state.loading}>
                    Log in
                  </button>
                  <Link className="login-button p-5" to="/signup">Sign up</Link>
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default WithAuthConsumer(Login)