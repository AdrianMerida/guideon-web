import React from 'react'
import './SignUp.css'
import { register, uploadImage } from '../../services/GuideonService'
import { Redirect } from 'react-router-dom'

class SignUp extends React.Component {

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
      avatarUrl: 'http://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png',
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
      <div className="profile-container">

        <div className="profile-avatar">
          <div className="profile-avatar-img-div"
            style={{
              backgroundImage: `url(${this.state.data.avatarUrl ? this.state.data.avatarUrl : 'http://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png'})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <input type="file" name="avatarUrl" onChange={this.handleFileUpload} className="profile-avatar-img"></input>
          </div>
        </div>

        <form className="profile-form" onSubmit={this.handleSubmit}>
          <div className="profile-field">
            <i className="profile-icon fa fa-user fa-2x"></i>
            <input
              onChange={this.handleChange}
              name="name"
              type="string"
              className="profile-input"
              autoComplete="off"
              placeholder="Name">
            </input>
          </div>

          <div className="profile-field">
            <i className="profile-icon fa fa-envelope fa-2x"></i>
            <input
              onChange={this.handleChange}
              name="email"
              type="email"
              className="profile-input"
              autoComplete="off"
              placeholder="Email Address">
            </input>
          </div>

          <div className="profile-field">
            <i className="profile-icon fa fa-lock fa-2x"></i>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              className="profile-input"
              autoComplete="off"
              placeholder="Password">
            </input>
          </div>

          <div className="profile-field">
            <i className="profile-icon fa fa-phone fa-2x"></i>
            <input
              onChange={this.handleChange}
              maxLength="9"
              name="phoneNumber"
              type="string"
              className="profile-input"
              autoComplete="off"
              placeholder="Phone Number">
            </input>
          </div>

          <div className="profile-field">
            <i className="profile-icon fa fa-birthday-cake fa-2x"></i>
            <input
              onChange={this.handleChange}
              name="birthDate"
              type="date"
              className="profile-input"
              autoComplete="off"
              placeholder="Birth Date">
            </input>
          </div>

          <div className="profile-field">
            <i className="profile-icon fa fa-info-circle fa-2x"></i>
            <textarea
              onChange={this.handleChange}
              name="description"
              type="string"
              className="profile-input profile-description"
              autoComplete="off"
              placeholder="Write something about you">
            </textarea>
          </div>

          <button className="profile-button" type="submit"><strong>Sign Up</strong></button>
        </form>
      </div>
    )
  }
}

export default SignUp