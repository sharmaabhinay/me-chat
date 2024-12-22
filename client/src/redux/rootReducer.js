import {combineReducers}  from 'redux';
import userData from './user/reducer';
import socket from './socket/reducer';

const rootReducer = combineReducers({
    userData,
    socket
})
export default rootReducer;