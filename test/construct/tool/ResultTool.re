let getExnSuccessValue = result => {
  result->Result.handleFail(Exception.throwErr);
};
