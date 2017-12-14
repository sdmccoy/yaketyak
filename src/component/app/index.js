import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import appStoreCreate from '../../lib/app-store-create.js';
import Signin from '../signin/index.js';
import Main from '../main';
import '../../style/_main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//tracking
import track from 'react-tracking';
import * as trackerActions from '../../action/tracker.js';

//invoking the redux store, wrapping the whole app for state mgnt
const store = appStoreCreate();
@track({}, { dispatch: (data) => {
  return store.dispatch(trackerActions.addTrackEvent(data));
},
})
class App extends React.Component{

  render(){
    return(
      <Provider store={store}>
        <MuiThemeProvider>
          <div className='app-container'>
            <Route exact path='/' component={Signin} />
            <Route exact path='/main' component={Main} />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
