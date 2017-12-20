import superagent from 'superagent';

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

// 
// export const deleteMessageRequest = messageID => dispatch => {
//   superagent.delete(`${__API_CON__}${messageID}`)
//     .type('application/json, charset=utf8')
//     .set('Api-Token', `${__API_TOKEN__}`)
//     .then(() => {
//       dispatch(deleteMessage(messageID));
//
//     })
//     .catch(error => console.error(error));
// };
