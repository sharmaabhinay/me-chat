import { SET_CURRENT_FRIEND, SET_USER_DATA, SIGN_IN, SIGN_IN_PROFILE } from "./constant"

export const setUserData = (data)=>{
    return {
        type: SET_USER_DATA,
        data
    }
}
export const sign_in_profile = (data)=>{
    return {
        type: SIGN_IN_PROFILE,
        data
    }
}
export const set_sign_in = (data)=>{
    return {
        type: SIGN_IN,
        data
    }
}
export const set_current_friend = (data)=>{
    return {
        type: SET_CURRENT_FRIEND,
        data
    }
}