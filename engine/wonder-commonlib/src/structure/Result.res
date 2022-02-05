type t<'a, 'b> = Belt.Result.t<'a, 'b>

type t2<'a> = t<'a, Js.Exn.t>

let succeed = x => Ok(x)

let fail = x => Error(x)

let _buildErr = msg => msg->Exception.buildErr

let failWith = x => x->_buildErr->fail

let isSuccess = result =>
  switch result {
  | Ok(s) => true
  | Error(f) => false
  }

let either = (result, successFunc, failureFunc) =>
  switch result {
  | Ok(s) => successFunc(s)
  | Error(f) => failureFunc(f)
  }

let bind = (result, switchFunc) => either(result, switchFunc, fail)

let tap = (result, oneTrackFunc) =>
  either(
    result,
    result => {
      result->oneTrackFunc->ignore
      result->succeed
    },
    fail,
  )

let tryCatch = (oneTrackFunc: unit => 'b): t2<'b> =>
  try oneTrackFunc()->succeed catch {
  | Js.Exn.Error(e) => fail(e)
  | err => j`unknown error: $err`->_buildErr->fail
  }

let mapSuccess = (result, mapFunc) =>
  switch result {
  | Ok(s) => mapFunc(s)->succeed
  | Error(f) => fail(f)
  }

let handleFail = (result: t<'s, 'f>, handleFailFunc: 'f => 's): 's =>
  switch result {
  | Ok(s) => s
  | Error(f) => handleFailFunc(f)
  }

let getExn = result => result->handleFail(Exception.throwErr)

let toNullable = result =>
  switch result {
  | Ok(s) => Js.Nullable.return(s)
  | Error(f) => Js.Nullable.null
  }

let open_ = resultResultData =>
  switch resultResultData {
  | Error(f) => fail(f)
  | Ok(s) => s
  }
