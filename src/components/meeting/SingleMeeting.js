import React from 'react'
import './SingleMeeting.css'
import { Link } from 'react-router-dom'

const SingleMeeting = ({ meeting }) => (
  // <Link to={{ pathname: `/meetings/${meeting.id}`, query: { meeting: meeting } }}
  //   className="single-meeting-container" >
  <Link to={`/meetings/${meeting.id}`} className="single-meeting-container" >
    <div className="single-meeting-location">
      {meeting.location}
    </div>
    <div className="single-meeting-duration">
      {meeting.duration}
    </div>
    <div className="single-meeting-date">
      {meeting.date}
    </div>
    <div className="single-meeting-state">
      {meeting.state}
    </div>
  </Link>
)

export default SingleMeeting