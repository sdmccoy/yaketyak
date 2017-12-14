export const log = (...args) =>
  //eslint-disable-next-line
  __DEBUG__ ? console.log(...args) : undefined;

export const logError = (...args) =>
  //eslint-disable-next-line
  __DEBUG__ ? console.error(...args) : undefined;
