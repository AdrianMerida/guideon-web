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
    date: new Date(),
    loading: false,
    locationOptions: [],
    errorLocation: false, // por si diera tiempo
    errorDuration: false,
    meetingCreated: false,
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true }, () => {
      createMeeting({ ...this.state })
        .then(
          (meeting) => {
            if (meeting) {
              this.setState({ meetingCreated: true })
            }
          },
          () => {
            this.setState({ loading: false })
          })
    })
  }

  getLocations = (input) => {
    if (input !== "") {
      forwardGeocoding(input)
        .then(locations => {
          console.log(locations)
          const searchLocations = locations.features.map(location =>
            ({ 'value': location.place_name, 'label': location.place_name }))
          this.setState({ locationOptions: searchLocations })
        })
    }
  }

  dateOnChange = date => {
    // Pone una hora menos por defecto
    // const newDate = date.setHours(date.getHours() + 1);
    // console.log(date)
    // return
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

    if (this.state.meetingCreated) {
      return <Redirect to="/" />
    }

    return (
      <div className="create-meeting">
        <div className="create-meeting-container">
          <form onSubmit={this.handleSubmit}>
            <Select
              closeMenuOnSelect={false}
              options={options}
              searchable={true}
              onChange={this.selectDurationChange}
              placeholder="Select duration..."
            />
            <Select
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

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    )
  }
}

export default WithAuthConsumer(CreateMeeting)