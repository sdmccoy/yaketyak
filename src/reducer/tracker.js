export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'ADD_EVENT':
  //returning oldest to most recent event
    return [...state, payload];

  default: return state;

  }
};
