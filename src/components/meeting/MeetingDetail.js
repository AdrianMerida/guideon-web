import React from 'react'
import { getOneMeeting } from '../../services/GuideonService'

class MeetingDetail extends React.Component {

  state = {
    loading: false,
    meeting: null
  }

  componentDidMount() {
    const meetingId = this.props.match.params.meetingId
    getOneMeeting(meetingId)
      .then(meeting => {
        console.log(meeting)
        this.setState({ meeting: meeting })
      })
  }

  render() {

    if (!this.state.meeting) {
      return <div>Loading...</div>
    }

    return (
      <div>
        MeetingDetail
    </div>
    )
  }


}



export default MeetingDetail