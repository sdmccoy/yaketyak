import superagent from 'superagent';

export const fetchOpenChannels = channels => ({
  type: 'FETCH_OPENCHANNELS',
  payload: channels,
});

export const createOpenChannel = channel => ({
  type: 'CREATE_OPENCHANNEL',
  payload: channel,
});

export const deleteChannel = channelUrl => ({
  type: 'DELETE_CHANNEL',
  payload: channelUrl,
});

export const deleteChannelRequest = channelUrl => dispatch => {
  superagent.delete(`${__API_CON__}${channelUrl}`)
    .type('application/json, charset=utf8')
    .set('Api-Token', `${__API_TOKEN__}`)
    .then(() => {
      dispatch(deleteChannel(channelUrl));

    })
    .catch(error => console.error(error));
};
