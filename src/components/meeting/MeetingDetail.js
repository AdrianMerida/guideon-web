import React from 'react'
import { getOneMeeting } from '../../services/GuideonService'
import './MeetingDetail.css'

class MeetingDetail extends React.Component {

  state = {
    loading: false,
    meeting: null,
    closeMeeting: false
  }

  componentDidMount() {
    const meetingId = this.props.match.params.meetingId
    getOneMeeting(meetingId)
      .then(meeting => {
        console.log(meeting)
        this.setState({ meeting: meeting })
      })
  }

  closeMeeting = () => {
    this.setState({ closeMeeting: true })
  }

  splitDate = (date) => (new Date(date).toISOString().split('T')[0])

  render() {

    if (!this.state.meeting) {
      return <div>Loading...</div>
    }

    const closeClass = this.state.closeMeeting ? 'close-meeting' : ''

    return (
      <div className={`meeting-detail ${closeClass}`}>
        <button onClick={this.closeMeeting} className="meeting-detail-close fa fa-window-close fa-2x"></button>
        <div className="meeting-detail-container">
          <h1>Meeting</h1>

          <div className="meeting-detail-users">
            <div className="meeting-detail-sender">
              <img src={this.state.meeting.sender.avatarUrl} alt="avatar"></img>
              <button onClick={this.closeMeeting} className="meeting-detail-like fa fa-heart fa-2x"></button>
              <h3>{this.state.meeting.sender.name}</h3>
            </div>

            <div className="meeting-detail-receiver">
              <img src={this.state.meeting.sender.avatarUrl} alt="avatar"></img>
              <button onClick={this.closeMeeting} className="meeting-detail-like fa fa-heart fa-2x"></button>
              <h3>{this.state.meeting.sender.name}</h3>
            </div>
          </div>

          <div className="meeting-detail-information">
            <div className="meeting-detail-information-state">
              <i className="fa fa-map-marker fa-2x"></i>
              <h3 className="meeting-detail-location">{this.state.meeting.location}</h3>
            </div>
            <div className="meeting-detail-information-state">
              <i className="fa fa-hourglass fa-2x"></i>
              <h3 className="meeting-detail-location">{this.state.meeting.duration} hours</h3>
            </div>
            <div className="meeting-detail-information-state">
              <i className="fa fa-calendar fa-2x"></i>
              <h3 className="meeting-detail-date">{this.splitDate(this.state.meeting.date)}</h3>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default MeetingDetail