import React from 'react'
import './PrivateMessage.css'
import { sendMsg, getUserDetail } from '../../services/GuideonService'

class PrivateMessage extends React.Component {

  state = {
    otherUser: '',
    loading: false,
    msg: '',
    sentMsg: false
  }

  componentDidMount() {
    getUserDetail(this.props.id)
      .then(user =>
        this.setState({ otherUser: user })
      )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true }, () => {
      sendMsg(this.state.otherUser.id, this.state)
        .then(
          (chat) => {
            if (chat) {
              setTimeout(this.props.onClickHide, 10000)
              this.setState({ sentMsg: true })
            }
          },
          (error) => {
            this.setState({ loading: false })
          })
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  onClickMessage = (e) => {
    e.target.placeholder = ''
  }

  onBlurMessage = (e) => {
    e.target.placeholder = 'Write a message...'
  }

  render() {

    if (!this.state.otherUser || this.state.loading) {
      return <div>Loading...</div>
    }

    return (
      <div className="private-message">
        {this.state.sentMsg && (
          <div className="private-message-sent"><strong>Message Sent!</strong></div>
        )}

        <div className="private-message-container">
          <div className="private-message-user-information">
            <img src={this.state.otherUser.avatarUrl} alt="avatar" />
            <h3>{this.state.otherUser.name}</h3>
          </div>

          <form onSubmit={this.handleSubmit} className="private-message-form">
            <textarea
              onChange={this.handleChange}
              name="msg"
              className="private-message-msg"
              placeholder="Write a message..."
              onClick={this.onClickMessage}
              onBlur={this.onBlurMessage}
            />

            <button type="submit" className="private-message-button">Send</button>

          </form>

        </div>
      </div>
    )
  }


}

export default PrivateMessage