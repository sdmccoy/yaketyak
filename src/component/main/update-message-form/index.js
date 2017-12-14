import React from 'react';
import {connect} from 'react-redux';
import * as channelMessageActions from '../../../action/message.js';
//tracking
import track from 'react-tracking';
//style
import './_update-message-form.scss';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {CardActions} from 'material-ui/Card';

@track({page: 'updatemessage-component'}, {dispatchOnMount: (contextData) => ({event: 'updatemessage-component-mounted'}),
})
class UpdateMessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      updatedMessage: this.props.message.message || '',
      updatedData: null,
      updatedCustomType: null,
      showUpdateForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMessageUpdate = this.handleMessageUpdate.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  //toggle update form
  @track((props, state) => {
    return {action: state.showUpdateForm ? 'update-message-form-minimize' : 'update-message-form-expand'};
  })
  showUpdateForm(){
    this.setState({showUpdateForm: !this.state.showUpdateForm});
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //update the current message with the data
  //track the update event with the msg id
  @track((props, state) => {
    return {action: `update-message, id: ${props.message.messageId}`};
  })
  handleMessageUpdate(message){

    let channel = this.props.channel;
    let {updatedMessage, updatedData, updatedCustomType} = this.state;
    let updateMessage = this.props.updateMessage;

    channel.updateUserMessage(message.messageId, updatedMessage, updatedData, updatedCustomType, (userMessage, error) => {
      if (error) return console.error(error);
      //update app store state for sender socket
      updateMessage(userMessage);
    });
    this.setState({showUpdateForm: false});
  }


  render(){
    const style = {
      fab: {
        width: '2px',
      },
    };
    return(
      <div className='update-message-form-container'>

        <i className="material-icons"
          onClick={this.showUpdateForm}
        >
        mode_edit
        </i>
        {this.state.showUpdateForm ?
          <div className='update-form'>
            <form >
              <input
                name='updatedMessage'
                type='text'
                placeholder='Type Update Here ...'
                onChange={this.handleChange}
                value={this.state.updatedMessage}
              />
            </form>
            <FloatingActionButton   className="send-message-button" type="submit"
              mini={true}
              zDepth={0}
              onClick={() => this.handleMessageUpdate(this.props.message)}
            >
              <i id='update-send' className="material-icons">send</i>
            </FloatingActionButton>
          </div>
          :
          undefined
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMessageForm);
