export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PARTICIPANTLIST':
    return payload;

  case 'ADD_PARTICIPANT':
    return [...state, payload];

  default: return state;
  }
};
