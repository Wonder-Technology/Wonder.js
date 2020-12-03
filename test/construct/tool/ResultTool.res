let getExnSuccessValue = result => result->Result.handleFail(Exception.throwErr)

let getExnSuccessValueIgnore = result => result->getExnSuccessValue->ignore

let buildEmptyHandleFailFunc = () => Exception.throwErr
