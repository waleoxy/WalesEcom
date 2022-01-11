const getError = (err) =>
  err.response && err.reposnse.data.err.response.data.message
    ? err.response.data.message
    : err.message;
export { getError };
