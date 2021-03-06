import React from 'react';
import SendBird from 'sendbird';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as error from '../error';
import * as userActions from '../../action/user.js';
//tracking
import track from 'react-tracking';
//assets
import yakBubble from '../../assets/yakbubble.png';
//style
import './_signin.scss';

//importing sb object
import * as client from '../../lib/sb-object.js';
let sb = client.sb;

//decorator tracking
@track({page: 'signin-page'}, {dispatchOnMount: (contextData) => ({event: 'signin-page-mounted'}) })
class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userID: '',
      errMsg: '',
      redirect: false,
      passWord: '',
      showErrorMsg: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userConnect = this.userConnect.bind(this);
    this.handleShowErrorMsg = this.handleShowErrorMsg.bind(this);
  }

  //set the state as the input event changes
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  //close error message
  //track try again button
  @track({action: 'click-tryagain'})
  handleShowErrorMsg(){
    this.setState({
      showErrorMsg: !this.state.showErrorMsg,
    });
  }

  //track sign in button event
  @track({action: 'click-signin'})
  handleSubmit(e){
    e.preventDefault();

    //verify user has pw from admin to access live app
    this.state.passWord === __SIGNIN_PW__ ?
      this.userConnect()
      :
      this.setState({
        userID: '',
        passWord: '',
        showErrorMsg: !this.state.showErrorMsg,
      });
  }

  //connect user from form
  //track connection
  @track({action: 'user-connected'})
  userConnect(){
    //set to current instance to pass in props & state
    let currentUser = this;

    sb.connect(currentUser.state.userID, __API_TOKEN__, (user, error) => {
      if(error) return console.error(error);
      //set user state to app store through redux
      currentUser.props.userSignin(user);
      currentUser.setState({redirect: true, userID: ''});
    });


  }


  render(){
    //redirect after signin
    const {redirect} = this.state;
    if(redirect) {return <Redirect to='/main'/>;}

    return(
      <div className='signin-container'>
        <header>
          <h1>Yaketyak!</h1>
          <h4>A friendly place for live conversations</h4>
        </header>
        <img className='yak' src={yakBubble} />
        {!this.state.showErrorMsg ?
          <form onSubmit={this.handleSubmit}>
            <input
              name='userID'
              type='text'
              placeholder='userID'
              onChange={this.handleChange}
              value={this.state.userID}
            />
            <input
              name='passWord'
              type='password'
              placeholder='Password'
              onChange={this.handleChange}
              value={this.state.passWord}
            />
            <button className="login-button" type="submit">Signin</button>
          </form>
          :
          <div className='signin-error-container'>
            <error.SigninError />
            <button
              onClick={this.handleShowErrorMsg}
            >
            Try Again?
            </button>
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userSignin: user => dispatch(userActions.userSignin(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
