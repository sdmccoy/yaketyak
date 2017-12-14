export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PARTICIPANTLIST':
    return payload;

  default: return state;
  }
};
