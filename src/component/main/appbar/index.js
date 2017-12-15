import React from 'react';
import {connect} from 'react-redux';
import yak from '../../../assets/yaksmall.png';
//style
import './_appbar.scss';

class Appbar extends React.Component{

  render(){
    return(
      <div className='appbar'>
        <img src={yak} />
        <h3>Welcome to Yaketyak, {this.props.user.nickname || this.props.user.userId}!</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
