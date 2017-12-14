import React from 'react';
import Appbar from './appbar';
import CreateChannel from './create-channel';
import OpenChannels from './open-channels';
import Profile from './profile';
import Chat from './chat';
import ParticipantList from './participant-list';
import './_main-comp.scss';

class Main extends React.Component{
  render(){
    return(
      <div className='main-container'>
        <Appbar />
        <aside className='aside-left'>
          <CreateChannel />
          <OpenChannels />
        </aside>
        <Chat />
        <aside className='aside-right'>
          <Profile />
          <ParticipantList />
        </aside>
      </div>
    );
  }
}

export default Main;
