type t('a, 'b) =
  | Success('a)
  | Fail('b);

type t2('a) = t('a, Js.Exn.t);

let succeed = x => Success(x);

let fail = x => Fail(x);

let _raiseErrorAndReturn = msg => msg->Exception.buildErr;

let failWith = x => x->_raiseErrorAndReturn->Fail;

let either = (twoTrackInput, successFunc, failureFunc) =>
  switch (twoTrackInput) {
  | Success(s) => successFunc(s)
  | Fail(f) => failureFunc(f)
  };

let bind = (twoTrackInput, switchFunc) =>
  either(twoTrackInput, switchFunc, fail);

let tap = (twoTrackInput, oneTrackFunc) =>
  either(
    twoTrackInput,
    result => {
      result->oneTrackFunc->ignore;
      result->succeed;
    },
    fail,
  );

let tryCatch = (oneTrackFunc: unit => 'b): t2('b) =>
  try(oneTrackFunc()->succeed) {
  | Js.Exn.Error(e) => fail(e)
  | err => {j|unknown error: $err|j}->_raiseErrorAndReturn->fail
  };

let mapSuccess = (result, mapFunc) =>
  switch (result) {
  | Success(s) => mapFunc(s)->succeed
  | Fail(f) => fail(f)
  };

let handleFail = (result: t('s, 'f), handleFailFunc: 'f => 's): 's =>
  switch (result) {
  | Success(s) => s
  | Fail(f) => handleFailFunc(f)
  };
