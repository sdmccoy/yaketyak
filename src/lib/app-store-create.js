import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import reporter from './redux-reporter.js';
import thunk from './redux-thunk.js';

const appStoreCreate = () => createStore(reducer, applyMiddleware(reporter, thunk));

export default appStoreCreate;
