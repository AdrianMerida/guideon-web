import React from 'react'
import './Conversation.css'
import withConversations from '../../hocs/withConversations'
import SingleConversation from './SingleConversation'

class Conversation extends React.Component {

  state = {
    conversations: this.props.conversations
  }
  
  render(){
    return(
      <div className="conversations">
        {this.state.conversations.map((conversation, i) => (
          <SingleConversation conversation={conversation} key={i} />
        ))}
      </div>
    )
  }

}

export default withConversations(Conversation)