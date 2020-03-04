import React from 'react'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'
import { createMeeting } from '../../services/GuideonService'
import { forwardGeocoding } from '../../services/MapboxService'
import { Redirect } from 'react-router-dom';
import { WithAuthConsumer } from '../../contexts/AuthContext'
import './CreateMeeting.css'

class CreateMeeting extends React.Component {

  state = {
    sender: this.props.currentUser.id,
    location: '',
    duration: '',
    date: null,
    loading: false,
    locationOptions: [],
    errorLocation: false, // por si diera tiempo
    errorDuration: false,
    meetingCreated: false,
    description: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true }, () => {
      createMeeting({ ...this.state })
        .then(
          (meeting) => {
            if (meeting) {
              this.setState({ meetingCreated: true })
              this.goHome()
            }
          },
          () => {
            this.setState({ loading: false })
          })
    })
  }

  goHome = () => {
    setTimeout(() => { window.location.assign('/') }, 2000)
  }

  getLocations = (input) => {
    if (input !== "") {
      forwardGeocoding(input)
        .then(locations => {
          const searchLocations = locations.features.map(location =>
            ({ 'value': location.place_name, 'label': location.place_name }))
          this.setState({ locationOptions: searchLocations })
        })
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
         [name]: value
      })
  }

  dateOnChange = date => {
    // Pone una hora menos por defecto
    // const newDate = date.setHours(date.getHours() + 1);
    // console.log(date)
    // return
    // console.log(typeof(new Date(date.toString())))
    this.setState({ date: date })
  }

  selectDurationChange = event => {
    const { value } = event
    this.setState({
      duration: value
    })
  }

  selectLocationChange = event => {
    const { value } = event
    this.setState({
      location: value
    })
  }

  render() {

    const options = [
      { value: '0.5', label: 'Media hora' },
      { value: '1', label: 'Una hora' },
      { value: '2', label: 'Dos horas' },
      { value: '3', label: 'Tres horas' },
      { value: '4', label: 'Cuatro horas' },
    ]

    return (
      <div className="create-meeting">
        {this.state.meetingCreated && (
          <div className="create-meeting-sent"><strong>Meeting Created!</strong></div>
        )}
        <div className="create-meeting-container">
          <form onSubmit={this.handleSubmit} className="create-meeting-form">
            <Select
              className="create-meeting-selector"
              closeMenuOnSelect={false}
              options={options}
              searchable={true}
              onChange={this.selectDurationChange}
              placeholder="Select duration..."
            />
            <Select
              className="create-meeting-selector"
              closeMenuOnSelect={false}
              searchable={true}
              isDisabled={false}
              options={this.state.locationOptions}
              onChange={this.selectLocationChange}
              onInputChange={this.getLocations}
              placeholder="Select location..."
            />
            <DateTimePicker
              showTimeSelect
              className="create-meeting-picker"
              onChange={this.dateOnChange}
              value={this.state.date}
            />

            <textarea
              value={this.state.description}
              onChange={this.handleChange}
              className="create-meeting-msg"
              placeholder="Write a message..."
              name="description"
            />

            <button className="create-meeting-create-button" type="submit">Create</button>
          </form>
        </div>
      </div>
    )
  }
}

export default WithAuthConsumer(CreateMeeting)