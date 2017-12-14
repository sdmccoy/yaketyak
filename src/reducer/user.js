
export default (state=[], action) => {
  const {payload, type} = action;
  switch (type) {
  case 'USER_SIGNIN':
    return payload;

  case 'USER_EDITPROFILE':
    var filteredList = state.filter(user => user.userId !== payload.userId);
    return [payload, ...filteredList];

  default: return state;

  }
};
