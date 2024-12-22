import { REFRESH_CONTACT_LIST, SET_CURRENT_FRIEND, SET_FRND_ONLINE, SET_IS_ONLINE, SET_USER_DATA, SIGN_IN, SIGN_IN_PROFILE } from "./constant"

export const set_User_Data = (data)=>{
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
export const set_is_online = (data)=> {
    return {
        type: SET_IS_ONLINE,
        data
    }
}
export const set_sign_in = (data)=>{
    return {
        type: SIGN_IN,
        data
    }
}
export const refresh_contact_list = (data)=> {
    return {
        type: REFRESH_CONTACT_LIST,
        data
    }
}
export const set_current_friend = (data)=>{
    return {
        type: SET_CURRENT_FRIEND,
        data
    }

}
export const set_frnd_online = (data)=> {
    return {
        type: SET_FRND_ONLINE,
        data
    }
}