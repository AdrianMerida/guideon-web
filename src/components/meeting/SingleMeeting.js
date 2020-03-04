import React from 'react'
import './SingleMeeting.css'
import { acceptMeeting, declineMeeting } from '../../services/GuideonService'
import MeetingDetail from './MeetingDetail'

class SingleMeeting extends React.Component {

  state = {
    meeting: this.props.meeting,
    meetingDetail: false,
    imTheSender: this.props.imTheSender
  }

  handleClickAccept = () => {
    acceptMeeting(this.state.meeting.id)
      .then(meeting => {
        this.setState({meeting: meeting})
      })
  }

  handleClickDecline = () => (
    declineMeeting(this.state.meeting.id)
      .then(meeting => {
        this.setState({ meeting: meeting })
      })
  )

  capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  messageDate = (date) => {
    if (date) {
      const testDate = new Date(date)
      return testDate.getHours() + ':' + testDate.getMinutes() + ' - ' +
        testDate.getDate().toString().padStart(2, '0') + '/' +
        (testDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
        (testDate.getFullYear())
    }
  }

  showDetail = () => {
    this.setState({ meetingDetail: true })
  }

  onClickHide = () => {
    this.setState({ meetingDetail: false })
  }


  render() {

    if (!this.state.meeting) {
      return <div>Loading...</div>
    }

    if (this.state.meetingDetail) {
      return <MeetingDetail meeting={this.state.meeting} onClickHide={this.onClickHide} />
    }

    const hideButton = this.state.imTheSender ? '' : 'single-meeting-hide-button'

    return (

      <div className="single-meeting-container" >

        <div className="single-meeting-users">
          <img src={this.state.meeting.sender.avatarUrl} alt="avatar" />
          {this.state.meeting.receiver && (
            <img src={this.state.meeting.receiver.avatarUrl} alt="avatar" />
          )}
        </div>

        <div onClick={this.showDetail} className="single-meeting-info">
          <div className="single-meeting-data">
            <i className="fa fa-map-marker color-red"></i>
            <h4>{this.state.meeting.location}</h4>
          </div>

          <div className="single-meeting-data">
            <i className="fa fa-hourglass color-sand"></i>
            <h4>{this.state.meeting.duration} hours</h4>
          </div>
          <div className="single-meeting-data">
            <i className="fa fa-calendar"></i>
            <h4>{this.messageDate(this.state.meeting.date)}</h4>
          </div>
        </div>

        <div className="single-meeting-actions">
          {this.state.meeting.state !== 'requested' && (
            <div className="single-meeting-buttons">
              <strong>{this.capitalizeFirstLetter(this.state.meeting.state)}</strong>
            </div>
          )}
          {this.state.meeting.state === 'requested' && (
            <div className="single-meeting-buttons">
              <div className="single-meeting-state"><strong>Requested</strong></div>
              <div className={`single-meeting-accept ${hideButton}`} onClick={this.handleClickAccept}>Accept</div>
              <div className={`single-meeting-decline ${hideButton}`} onClick={this.handleClickDecline}>Decline</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SingleMeeting
