const initialState = {
  token: null,
  name: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    /*
      case LOGIN_SUCCESS:
      return { ...state, ...action.payload };

      case LOG_OUT:
      return { ...initialState, token: null };

      */
    default:
      return state;
  }
};
