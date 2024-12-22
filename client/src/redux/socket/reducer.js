let initialState = null;
let socket = (state=initialState, action)=>{
    // console.log(action)
    switch(action.type){
        case 'ESTABLISH_CONNECTION':
            return action.data
        default:{
            return null
        }
    }
}
export default socket;