import React from 'react'
import './login.css'
import { login } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom';

// PENDIENTE DE PONER UN CONTEXTO PARA PASAR EL USUARIO POR LA APP :)

class Login extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    error: false,
    loading: false,
    user: undefined
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ loading: true, error: false }, () => {
      login({ ...this.state.data })
        .then(response => {
          // this.props.setUser(response.data)
          this.setState({user: response})
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

  render() {

    // SOLO PARA PROBAR QUE LOGEA
    if (this.state.user) {
      return <Redirect to="/" />
    }

    return (
      <div className="login">
        <div className="login-container">

          <form className="login-form" onSubmit={this.handleSubmit}>
            <h1 className="login-title">GUIDEON</h1>
            <div className="login-credentials">

              <div className="login-component vp-10">
                <label className="vp-10" htmlFor="email">Email</label>
                <input
                  onChange={this.handleChange}
                  className="login-input p-5"
                  autoComplete="off"
                  name="email"
                  type="email"
                  id="login-email"
                  placeholder="Enter your email..."
                />
              </div>

              <div className="login-component">
                <label className="vp-10" htmlFor="password">Password</label>
                <input
                  onChange={this.handleChange}
                  className="login-input p-5"
                  name="password"
                  type="password"
                  id="login-password"
                  placeholder="Enter your password..."
                />
              </div>

              <button
                type="submit"
                className=""
                disabled={this.state.loading}
              >
                Log in
            </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default Login