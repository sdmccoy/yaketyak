import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import SendBird from 'sendbird';
import * as userActions from '../../../action/user.js';
//tracking
import track from 'react-tracking';
//style
import './_profile.scss';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

//importing sb object
import * as client from '../../../lib/sb-object.js';
let sb = client.sb;

@track({page: 'profile-component'}, {dispatchOnMount: (contextData) => ({event: 'profile-component-mounted'}),
})
class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showProfileForm: false,
      nickname: '',
      profileUrl: '',
      userId: '',
      redirect: false,
    };
    this.handleShowProfileForm = this.handleShowProfileForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  //component mounts before props are sent, CDM fixes this
  componentDidMount(){
    this.setState({nickname: this.props.user.nickname, profileUrl: this.props.user.profileUrl, userId: this.props.user.userId});
  }

  //toggle showing the update profile form
  //track show form click event
  @track((undefined, state) => {
    return {action: state.showProfileForm ? 'click-profileform-minimize' : 'click-profileform-expand'};
  })
  handleShowProfileForm(){
    this.state.showProfileForm ? this.setState({showProfileForm: false}) : this.setState({showProfileForm: true});
  }

  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //update profile from form
  //track update action with userId
  @track((props, state) => {
    return {action: `click-update-profile, id: ${props.user.userId}`};
  })
  handleSubmit(e){
    e.preventDefault();
    this.handleShowProfileForm();
    //set to current instance to pass in props & state
    let currentUser = this;
    let {nickname, profileUrl} = currentUser.state;

    //update profile fn
    sb.updateCurrentUserInfo(nickname, profileUrl, (response, error) => {
      if(error) console.error(error);
      //if no error, set user state to app store
      currentUser.props.editUserProfile(response);
    });
  }

  //logout current user
  @track({action: 'user-signout'})
  handleSignout(){
    sb.disconnect(() => {
      // You are disconnected from SendBird.
      console.log('user signed out');
    });
    this.setState({redirect: true});
  }

  render(){
    const style = {
      drawer: {
        margin: '0',
      },
    };
    //redirect after signout
    const {redirect} = this.state;
    if(redirect) {return <Redirect to='/'/>;}

    return(
      <div className='profile-container'>
        <div className='title'>
          <h5>PROFILE</h5>
        </div>
        <h3>{this.state.nickname}</h3>
        <div className='avatar-container'>
          <img src={this.state.profileUrl} />
        </div>
        <h5>{this.state.userId}</h5>
        <button onClick={this.handleSignout}>Sign Out</button>
        <button onClick={this.handleShowProfileForm}>
        Edit Profile
        </button>
        {this.state.showProfileForm ?
          <Drawer openSecondary={true} containerClassName='profile-form'
          >
            <form onSubmit={this.handleSubmit}>
              <input
                name='nickname'
                type='text'
                placeholder='Nickname'
                onChange={this.handleChange}
                value={this.state.userID}
              />
              <input
                name='profileUrl'
                type='text'
                placeholder='Profile Image Link'
                onChange={this.handleChange}
                value={this.state.userID}
              />
              <RaisedButton className="edit-profile-button" type="submit">
                Submit
              </RaisedButton>
              <RaisedButton className="cancel-edit-button" onClick={this.handleShowProfileForm}>
                Cancel
              </RaisedButton>
            </form>
          </Drawer>
          : undefined
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  editUserProfile: user => dispatch(userActions.editUserProfile(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
