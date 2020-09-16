type t('a, 'b) =
  | Success('a)
  | Fail('b);

type t2('a) = t('a, Js.Exn.t);

let succeed = x => Success(x);

let fail = x => Fail(x);

let _buildErr = msg => msg->Exception.buildErr;

let failWith = x => x->_buildErr->fail;

let isSuccess = result => {
  switch (result) {
  | Success(s) => true
  | Fail(f) => false
  };
};

let either = (result, successFunc, failureFunc) =>
  switch (result) {
  | Success(s) => successFunc(s)
  | Fail(f) => failureFunc(f)
  };

let bind = (result, switchFunc) => either(result, switchFunc, fail);

let tap = (result, oneTrackFunc) =>
  either(
    result,
    result => {
      result->oneTrackFunc->ignore;
      result->succeed;
    },
    fail,
  );

let tryCatch = (oneTrackFunc: unit => 'b): t2('b) =>
  try(oneTrackFunc()->succeed) {
  | Js.Exn.Error(e) => fail(e)
  | err => {j|unknown error: $err|j}->_buildErr->fail
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

let getExn = result => {
  result->handleFail(Exception.throwErr);
};
