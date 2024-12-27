import {io} from 'socket.io-client';
import BackendUrl from '../backendUrl';

let socketConn = ()=> {
    let ENDPOINT = BackendUrl;
    const socket = io(ENDPOINT,{transports:['websocket']});
    if(socket){
        console.log('connected')
    }
    // dispatch(establish_connection(socket))
    return socket;
}
export default socketConn;