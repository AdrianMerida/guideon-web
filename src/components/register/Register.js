import React from 'react'
import './Register.css'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import { Link, Redirect } from 'react-router-dom'
import { register, uploadImage } from '../../services/GuideonService'

class Register extends React.Component {

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((el) => {
      this.setState({
        data: {
          ...this.state.data,
          location: {
            type: 'Point',
            coordinates: [el.coords.longitude, el.coords.latitude]
          }
        }
      })
    })
  }

  state = {
    data: {
      name: '',
      email: '',
      password: '',
      description: '',
      avatarUrl: '',
      phoneNumber: '',
      birthDate: new Date().toISOString().split('T')[0],
      location: this.getUserLocation()
    },
    error: {
      name: false,
      email: false,
      password: false,
      description: false,
      avatarUrl: false,
      phoneNumber: false,
      birthDate: false
      // location: false
    },
    errors: false,
    loading: false,
    register: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true, error: false }, () => {
      register({ ...this.state.data })
        .then(
          (user) => {
            this.setState({
              register: true
            })
            // this.props.setUser(user)
            // return <Redirect to='/login' />
          },
          (error) => {
            console.log(error)
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

  // this method handles just the file upload
  handleFileUpload = event => {

    const uploadData = new FormData();
    uploadData.append("avatarUrl", event.target.files[0]);

    uploadImage(uploadData)
      .then(response => {
        this.setState({ data: { ...this.state.data, avatarUrl: response.secure_url } });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }

  render() {

    if (this.state.register) {
      return <Redirect to="/login" />
    }

    return (
      <div className='register'>
        <form className="register-form" onSubmit={this.handleSubmit}>

          <div className="register-field">
            <label className="register-label" htmlFor="name"> Name </label>
            <input
              onChange={this.handleChange}
              name="name"
              type="string"
              className="register-input"
              autoComplete="off"
              placeholder="Enter your name...">
            </input>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="email"> Email </label>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              className="register-input"
              autoComplete="off"
              placeholder="Enter your email...">
            </input>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="password"> Password </label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              autoComplete="off"
              className="register-input">
            </input>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="description"> Description </label>
            <input
              onChange={this.handleChange}
              name="description"
              type="string"
              className="register-input"
              autoComplete="off"
              placeholder="Something about you...">
            </input>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="avatarUrl"> Avatar </label>
            <input
              onChange={this.handleFileUpload}
              name="avatarUrl"
              type="file"
              autoComplete="off"
              className="register-input">
            </input>
            <img src={this.state.data.avatarUrl} alt="Avatar" />
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="phoneNumber"> Phone number </label>
            <input
              maxLength="9"
              minLength="9"
              onChange={this.handleChange}
              name="phoneNumber"
              type="string"
              className="register-input"
              autoComplete="off"
              placeholder="Enter your phone number...">
            </input>
          </div>

          <div className="register-field">
            <label className="register-label" htmlFor="birthDate"> Birth date </label>
            <input
              onChange={this.handleChange}
              name="birthDate"
              type="date"
              autoComplete="off"
              className="register-input">
            </input>
          </div>

          <button type="submit" onSubmit={this.handleSubmit}>
            Register!
          </button>
        </form>

      </div>
    )
  }

}


export default WithAuthConsumer(Register)