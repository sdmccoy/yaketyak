export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PREVIOUSMESSAGES':
    var rpayload = payload.reverse();
    return rpayload;

  case 'ADD_NEWMESSAGE':
    return [...state, payload];

  case 'UPDATE_MESSAGE':
    return state.map(message => message.messageId === payload.messageId ? payload : message);

  case 'DELETE_MESSAGE':
    return  state.filter(message => message.messageId !== payload.messageId);


  default: return state;

  }
};
