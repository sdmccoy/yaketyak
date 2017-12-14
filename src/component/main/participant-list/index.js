import React from 'react';
import {connect} from 'react-redux';
//tracking
import track from 'react-tracking';
//style
import './_participant-list.scss';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

//decorator tracking
@track({page: 'participantlist-component'}, {dispatchOnMount: (contextData) => ({event: 'participantlist-component-mounted'}),
})
class ParticipantList extends React.Component{

  render(){
    const style = {
      chip: {
        width: '70%',
        margin: '2% 15%',
        textAlign: 'center',
      },
    };
    return(
      <div className='participant-list-container'>
        <div className='title'>
          <h5>CHAT BUDDIES</h5>
          <i className="material-icons">
            people
          </i>
        </div>
        {this.props.participantList.length > 0 ?
          this.props.participantList.map((participant, i) => {
            return <Chip className='chip' key={i}
              style={style.chip}
            >
              <Avatar src={participant.profileUrl} />
              {participant.userId}
            </Chip>;
          })
          :
          <h6>Enter a channel to see some buddies!</h6>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  participantList: state.participantList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
