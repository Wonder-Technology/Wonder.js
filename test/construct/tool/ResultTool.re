let getExnSuccessValue = result => {
  result->Result.handleFail(Exception.throwErr);
};

let buildEmptyHandleFailFunc = () => Exception.throwErr;
