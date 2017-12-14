export const setPreviousMessageList = previousMessages => ({
  type: 'SET_PREVIOUSMESSAGES',
  payload: previousMessages,
});

export const addNewMessage = message => ({
  type: 'ADD_NEWMESSAGE',
  payload: message,
});

export const deleteMessage = message => ({
  type: 'DELETE_MESSAGE',
  payload: message,
});

export const updateMessage = message => ({
  type: 'UPDATE_MESSAGE',
  payload: message,
});
