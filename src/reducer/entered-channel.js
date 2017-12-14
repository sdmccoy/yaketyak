export default (state = [], action) => {
  const {payload, type} = action;

  switch (type) {
  case 'SET_ENTEREDCHANNEL':
    return payload;

  default: return state;
  }

};
