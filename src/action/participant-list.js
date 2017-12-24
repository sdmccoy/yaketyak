export const setParticipantList = participantList => ({
  type: 'SET_PARTICIPANTLIST',
  payload: participantList,
});

export const addParticipantToList = participant => ({
  type: 'ADD_PARTICIPANT',
  payload: participant,
});
