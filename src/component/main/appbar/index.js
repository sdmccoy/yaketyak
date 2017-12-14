import React from 'react';
import {connect} from 'react-redux';
//style
import './_appbar.scss';

class Appbar extends React.Component{

  render(){
    return(
      <div className='appbar'>
        <i className="material-icons">send</i>
        <h3>Welcome to bluOrbit Chat, {this.props.user.nickname || this.props.user.userId}!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
