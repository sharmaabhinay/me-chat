import {combineReducers}  from 'redux';
import userData from './user/reducer';
import socket from './socket/reducer';
import Auth_Reducer from './auth/reducer';

const rootReducer = combineReducers({
    userData,
    socket, 
    Auth_Reducer
})
export default rootReducer;