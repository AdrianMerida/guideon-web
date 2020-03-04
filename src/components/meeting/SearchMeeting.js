import React from 'react'
import './SearchMeeting.css'
import { getPendingMeetings, requestMeeting, searchMeetings } from '../../services/GuideonService'
import { WithAuthConsumer } from '../../contexts/AuthContext'

class SearchMeeting extends React.Component {

  state = {
    meetings: null,
    loading: true,
    search: ''
  }

  componentDidMount() {
    getPendingMeetings()
      .then(meetings => {
        this.setState({ meetings })
      })
  }

  splitDate = (date) => {
    if (date) {
      return new Date(date).toISOString().split('T')[0]
    }
  }

  messageDate = (date) => {
    const testDate = new Date(date)
    return testDate.getHours() + ':' + testDate.getMinutes() + ' - ' +
      testDate.getDate().toString().padStart(2, '0') + '/' +
      (testDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
      (testDate.getFullYear())
  }

  requestMeeting = (id) => {
    requestMeeting(id, { receiver: this.props.currentUser.id })
      .then(meet => {
        if (meet) {
          this.setState({ meetings: this.state.meetings.filter(meeting => meeting.id.toString() !== id.toString()) })
        }
      })
  }

  handleSearchMeeting = (e) => {

    e.preventDefault()
    searchMeetings({ ...this.state })
      .then(meetings => {
        this.setState({ meetings: meetings })
      })
  }

  handleChange = (event) => {
    const location = event.target.value
    this.setState({ search: location })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSearchMeeting(e)
    }
  }

  render() {

    if (!this.state.meetings) {
      return <div>No meetings...</div>
    }
    return (
      <div className="search-meeting">
        <form className="search-meeting-finder">
          <i onClick={this.handleSearchMeeting} className="fa fa-search fa-2x"></i>
          <input
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </form>
        {this.state.meetings.map((meeting, i) =>
          <div className="search-meeting-container" key={i} >
            <div className="search-meeting-img">
              <img src={meeting.sender.avatarUrl} alt="avatar" />
              <h3>{meeting.sender.name}</h3>
            </div>
            <div className="search-meeting-info">
              <div className="search-meeting-field">
                <i className="fa fa-map-marker search-meeting-icon color-red"></i>
                <div className="search-meeting-data">
                  {meeting.location}
                </div>
              </div>
              <div className="search-meeting-field">
                <i className="fa fa-hourglass search-meeting-icon color-sand"></i>
                <div className="search-meeting-data">
                  {meeting.duration} hours
                </div>
              </div>
              <div className="search-meeting-field">
                <i className="fa fa-calendar search-meeting-icon color-black"></i>
                <div className="search-meeting-data">
                  {this.messageDate(meeting.date)}
                </div>
              </div>
              <div className="search-meeting-field">
                <i className="fa fa-info search-meeting-icon color-black"></i>
                <div className="search-meeting-data">
                 {meeting.description}
                </div>
              </div>
            </div>
            <div className="search-meeting-request">
              <button className="search-meeting-request-button" onClick={() => this.requestMeeting(meeting.id)}>Request</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default WithAuthConsumer(SearchMeeting)