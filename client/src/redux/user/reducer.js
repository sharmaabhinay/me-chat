import {
  REFRESH_CONTACT_LIST,
  SET_FRND_ONLINE,
  SET_IS_ONLINE,
  SET_CURRENT_FRIEND,
  SET_USER_DATA,
  SIGN_IN,
  SIGN_IN_PROFILE,
} from "./constant";

let initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  about: "",
  location: "",
  profile_pic: "",
  isOnline: false,
  isLoggedIn: false,
  contacts: [{}],
  fetchContacts: [{}],
  refreshContactList: false,
  currentFriend:{
    id:'',
    name:'',
    profile_pic:'',
    phone:'',
    online_status:false
  }
};

const userData = (state = initialState, action) => {
  // console.log("Current state:", state);
  // console.log("Incoming action:", action);


  switch (action.type) {
    case SIGN_IN:
      return {
        ...state, // Retain the existing state
        id: action.data._id,
        phone: action.data.phone,
        isLoggedIn: true,
      };

    case SIGN_IN_PROFILE:
      return {
        ...state, // Retain the existing state
        profile_pic: action.data.data.profile_pic,
        email: action.data.data.email,
        about: action.data.data.about,
        name: action.data.data.name,
      };

    case SET_USER_DATA:
      return {
        ...state, // Retain the existing state
        id: action.data._id || state.id,
        isLoggedIn: true,
        name: action.data?.name || state.name,
        email: action.data?.email || state.email,
        phone: action.data?.phone || state.phone,
        about: action.data?.about || state.about,
        location: action.data?.location || state.location,
        profile_pic: action.data?.profile_pic || state.profile_pic,
        isOnline: action.data?.isOnline || state.isOnline,
        contacts: action.data?.contacts || state.contacts,
      };

    case SET_IS_ONLINE:
      return {
        ...state, // Retain the existing state
        isOnline: action.data.isOnline, // Update only isOnline
      };
    case REFRESH_CONTACT_LIST:
      return {
        ...state,
        fetchContacts: action.data,
      };
    case SET_FRND_ONLINE:
      console.log(action)
      return {
        ...state,
        currentFriend:{
          ...state.currentFriend, online_status:action.data
        }
      };
    case SET_CURRENT_FRIEND:
      return {
        ...state,
        currentFriend:{
          ...state.currentFriend, id:action.data.id, name:action.data.name, profile_pic:action.data.profile_pic,phone:action.data.phone
        }
      }

    default:
      return state; // Return unchanged state by default
  }
};

export default userData;
