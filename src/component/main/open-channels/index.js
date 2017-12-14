import React from 'react';
import {connect} from 'react-redux';
import SendBird from 'sendbird';
import * as openChannelActions from '../../../action/open-channel.js';
import * as userActions from '../../../action/user.js';
import * as enteredChannelActions from '../../../action/entered-channel.js';
import * as channelParticipantActions from '../../../action/participant-list.js';
import * as channelMessageActions from '../../../action/message.js';
//tracking
import track from 'react-tracking';

//styles
import './_open-channels.scss';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;

const openChannelListQuery = sb.OpenChannel.createOpenChannelListQuery();

//decorator tracking
@track({page: 'openchannels-component'}, {dispatchOnMount: (contextData) => ({event: 'openchannels-component-mounted'}),
})
class OpenChannels extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      channel: '',
      showChannelDelete: false,
    };

    this._enterChannel = this._enterChannel.bind(this);
    this.enterChannel = this.enterChannel.bind(this);
    this.handleChannelDelete = this.handleChannelDelete.bind(this);
    this.fetchParticipantList = this.fetchParticipantList.bind(this);
    this.fetchPreviousMessageList = this.fetchPreviousMessageList.bind(this);
    this.showChannelDelete = this.showChannelDelete.bind(this);
  }

  //user signs in first then make query for channels
  componentWillMount(){
    openChannelListQuery.next((channels, error) => {
      if(error) return console.error(error);
      this.props.fetchOpenChannels(channels);
    });
  }

  //set state for tracking prior to entrance
  _enterChannel(enteredChannel){
    //call back for async issue
    this.setState({channel: enteredChannel}, () => {
      this.enterChannel(this.state.channel);
    });
  }

  //user enters channel
  //track when user attempts to enter channel
  @track((undefined, state) => {
    return {action: `enter-attempt-to-channel: ${state.channel.name}`};
  })
  enterChannel(channel){

    let addNewMessage = this.props.addNewMessage;
    let updateMessage = this.props.updateMessage;

    sb.OpenChannel.getChannel(channel.url, (channel, error) => {
      if(error) return console.error(error);

      channel.enter((response, error) => {
        if(error) return console.error(error);

        let ChannelHandler = new sb.ChannelHandler();

        //sending message to recieving socket handler
        ChannelHandler.onMessageReceived = (channel, message) => {
          //set app store for receiving user socket to see sent msg
          addNewMessage(message);
        };

        sb.addChannelHandler('received message', ChannelHandler);

        ChannelHandler.onMessageUpdated = (channel, message) => {
          //set app store for receiving user socket to see sent msg
          updateMessage(message);
        };

        sb.addChannelHandler('received message', ChannelHandler);

        //remove handler kills the action, todo: fix
        // sb.removeChannelHandler('received message');

        //set app store to entered channel
        this.props.setEnteredChannel(channel);
        //fetch the current participantList to append later
        this.fetchParticipantList(channel);
        //fetch 30 previous messages from channel
        this.fetchPreviousMessageList(channel);
      });
    });
  }

  fetchParticipantList(channel){
    let participantListQuery = channel.createParticipantListQuery();
    participantListQuery.next((participantList, error) => {
      if (error) return console.error(error);
      this.props.setParticipantList(participantList);
    });
  }

  fetchPreviousMessageList(channel){
    var messageListQuery = channel.createPreviousMessageListQuery();

    messageListQuery.load(30, true, (messageList, error) => {
      if (error) return console.error(error);
      this.props.setPreviousMessageList(messageList);
    });
  }

  //toggle the channel delete buttons
  //track user clicking the delete icon
  @track((undefined, state) => {
    return {action: state.showChannelDelete ? 'click-deletechannel-minimize' : 'click-deletechannel-expand'};
  })
  showChannelDelete(){
    this.setState({showChannelDelete: !this.state.showChannelDelete});
  }

  //delete channel on submit
  //track user action when deleting channel
  @track({action: 'click-channel-delete'})
  handleChannelDelete(channel){
    let {url} = channel;
    this.props.deleteChannelRequest(url);
  }

  render(){

    return(
      <List className='open-channels-container'>
        <div className='title'>
          <h5>OPEN CHANNELS</h5>
          <i className="material-icons"
            onClick={this.showChannelDelete}>
            delete
          </i>
        </div>

        {this.props.openChannels.length > 0 ?
          this.props.openChannels.map((channel, i) => {
            return <div className='open-channel' key={i}>
              <ListItem
                primaryText={channel.name}
                leftAvatar={<Avatar src={channel.coverUrl} />}
                rightIcon={<i className="material-icons">
                  chat
                </i>}
                secondaryText={channel.data}
                onClick={() => this._enterChannel(channel)}
              >
              </ListItem>
              {this.state.showChannelDelete ?
                <RaisedButton onClick={() => this.handleChannelDelete(channel)}>
                  <h6>Delete {channel.name}</h6>
                </RaisedButton>
                :
                undefined
              }
            </div>;
          })
          :
          <h6>No channels yet, create one above.</h6>
        }
      </List>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user,
  openChannels: state.openChannels,
});

const mapDispatchToProps = dispatch => ({
  fetchOpenChannels: channels => dispatch(openChannelActions.fetchOpenChannels(channels)),
  setParticipantList: participantList => dispatch(channelParticipantActions.setParticipantList(participantList)),
  setPreviousMessageList: previousMessages => dispatch(channelMessageActions.setPreviousMessageList(previousMessages)),
  deleteChannelRequest: channel => dispatch(openChannelActions.deleteChannelRequest(channel)),
  setEnteredChannel: channel => dispatch(enteredChannelActions.setEnteredChannel(channel)),
  addNewMessage: message => dispatch(channelMessageActions.addNewMessage(message)),
  updateMessage: message => dispatch(channelMessageActions.updateMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenChannels);
