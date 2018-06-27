const user = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      });
    case 'DEAUTHENTICATED':
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      });
    default:
      return state;
  }
};

export default user;
