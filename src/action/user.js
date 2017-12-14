
export const userSignin = user => ({
  type: 'USER_SIGNIN',
  payload: user,
});

export const editUserProfile = user => ({
  type: 'USER_EDITPROFILE',
  payload: user,
});
