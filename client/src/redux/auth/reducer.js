let initialState = {
    auth:false
};

let Auth_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.data };
    case "SET_USER":
      return { ...state, user: action.data };
    default:
      return state;
  }
}
export default Auth_Reducer;