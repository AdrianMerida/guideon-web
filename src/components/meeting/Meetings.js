import React from 'react'
import './Meetings.css'
import withMeetings from '../../hocs/withMeetings'
import { WithAuthConsumer } from '../../contexts/AuthContext'
import SingleMeeting from './SingleMeeting'

const Meetings = ({ meetings, currentUser }) => {

  if (!meetings.length) {
    return <div>No meetings...</div>
  }

  return (
    <div className="meetings">
      {meetings.map((meeting, i) =>
        <SingleMeeting
          meeting={meeting}
          imTheSender={currentUser.id.toString() === meeting.sender.id.toString() ? true : false} key={i} />
      )}
    </div>
  )
}

export default WithAuthConsumer(withMeetings(Meetings))