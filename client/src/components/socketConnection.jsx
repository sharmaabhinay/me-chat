import {io} from 'socket.io-client';
export let LocalUrl = "http://localhost:4300/";
export let RenderUrl = "https://me-chat-cazt.onrender.comm/";
export let BcUrl = "https://chat-app-backend-phi-azure.vercel.app/";

let socketConn = ()=> {
    let ENDPOINT = LocalUrl;
    const socket = io(ENDPOINT,{transports:['websocket']});
    if(socket){
        console.log('connected')
    }
    return socket;
}
export default socketConn;