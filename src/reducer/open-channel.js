export default (state=[], action) => {
  const {type, payload} = action;

  switch (type) {
  case 'CREATE_OPENCHANNEL':
    return [payload, ...state];

  case 'FETCH_OPENCHANNELS':
    return payload;

  case 'DELETE_CHANNEL':
    return state.filter(channel => channel.url !== payload);

  default: return state;
  }
};
