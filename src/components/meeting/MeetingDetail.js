import React from 'react'
import './MeetingDetail.css'
import { Link } from 'react-router-dom'
import OnlyChat from '../chat/OnlyChat'

class MeetingDetail extends React.Component {

  state = {
    loading: false,
    meeting: this.props.meeting,
    closeMeeting: false,
    showChat: false
  }

  componentDidMount() {
    // const meetingId = this.props.match.params.meetingId
    // getOneMeeting(meetingId)
    //   .then(meeting => {
    //     this.setState({ meeting: meeting })
    //   })
  }

  closeMeeting = () => {
    this.setState({ closeMeeting: true })
  }

  splitDate = (date) => (new Date(date).toISOString().split('T')[0])

  showChat = () => (this.setState({showChat: true}))
  hideChat = () => (this.setState({showChat: false}))
  
  render() {

    if (!this.state.meeting) {
      return <div>Loading...</div>
    }

    if (this.state.closeMeeting) {
      // window.location.assign('/meetings')
      this.props.onClickHide()
    }

    if (this.state.showChat) {
      return <OnlyChat meeting={this.props.meeting} onClickHide={this.hideChat} />
    }

    const closeClass = this.state.closeMeeting ? 'close-meeting' : ''

    return (
      <div className={`meeting-detail ${closeClass}`}>
        <button onClick={this.closeMeeting} className="meeting-detail-close fa fa-window-close fa-2x"></button>
        <div className="meeting-detail-container">
          <h2>Meeting - {this.state.meeting.state}</h2>

          <div className="meeting-detail-users">
            <div className="meeting-detail-sender">
              <img src={this.state.meeting.sender.avatarUrl} alt="avatar"></img>
              {/* <Link to={`/chats/${this.state.meeting.sender.id}`} className="meeting-detail-chat fa fa-comment fa-2x"></Link> */}
              <div onClick={this.showChat} className="meeting-detail-chat fa fa-comment fa-2x"></div>
              <h3>{this.state.meeting.sender.name}</h3>
            </div>

            {this.state.meeting.receiver && (
              <div className="meeting-detail-receiver">
                <img src={this.state.meeting.receiver.avatarUrl} alt="avatar"></img>
                {/* <Link to={`/chats/${this.state.meeting.receiver.id}`} className="meeting-detail-chat fa fa-comment fa-2x"></Link> */}
                <div onClick={this.showChat} className="meeting-detail-chat fa fa-comment fa-2x"></div>
                <h3>{this.state.meeting.receiver.name}</h3>
              </div>
            )}

            {!this.state.meeting.receiver && (
              <div className="meeting-detail-receiver">
                <img src="http://icons.iconarchive.com/icons/icons8/android/256/Users-User-icon.png" alt="avatar"></img>
                {/* <button onClick={this.closeMeeting} className="meeting-detail-like fa fa-comment fa-2x"></button> */}
                <h3>- - -</h3>
              </div>
            )}


          </div>

          <div className="meeting-detail-information">
            <div className="meeting-detail-information-state">
              <i className="fa fa-map-marker fa-2x color-red"></i>
              <h3 className="meeting-detail-location">{this.state.meeting.location}</h3>
            </div>
            <div className="meeting-detail-information-state">
              <i className="fa fa-hourglass fa-2x color-sand"></i>
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