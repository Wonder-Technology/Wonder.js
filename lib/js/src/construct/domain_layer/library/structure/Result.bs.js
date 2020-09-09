'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Exception$Wonderjs = require("./Exception.bs.js");

function succeed(x) {
  return {
          TAG: /* Success */0,
          _0: x
        };
}

function fail(x) {
  return {
          TAG: /* Fail */1,
          _0: x
        };
}

var _raiseErrorAndReturn = Exception$Wonderjs.buildErr;

function failWith(x) {
  return {
          TAG: /* Fail */1,
          _0: Exception$Wonderjs.buildErr(x)
        };
}

function either(twoTrackInput, successFunc, failureFunc) {
  if (twoTrackInput.TAG) {
    return Curry._1(failureFunc, twoTrackInput._0);
  } else {
    return Curry._1(successFunc, twoTrackInput._0);
  }
}

function bind(twoTrackInput, switchFunc) {
  return either(twoTrackInput, switchFunc, fail);
}

function tap(twoTrackInput, oneTrackFunc) {
  return either(twoTrackInput, (function (result) {
                Curry._1(oneTrackFunc, result);
                return {
                        TAG: /* Success */0,
                        _0: result
                      };
              }), fail);
}

function tryCatch(oneTrackFunc) {
  try {
    return {
            TAG: /* Success */0,
            _0: Curry._1(oneTrackFunc, undefined)
          };
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e.RE_EXN_ID === Js_exn.$$Error) {
      return {
              TAG: /* Fail */1,
              _0: e._1
            };
    } else {
      return {
              TAG: /* Fail */1,
              _0: Exception$Wonderjs.buildErr("unknown error: " + e)
            };
    }
  }
}

function mapSuccess(result, mapFunc) {
  if (result.TAG) {
    return {
            TAG: /* Fail */1,
            _0: result._0
          };
  } else {
    return {
            TAG: /* Success */0,
            _0: Curry._1(mapFunc, result._0)
          };
  }
}

function handleFail(result, handleFailFunc) {
  if (result.TAG) {
    return Curry._1(handleFailFunc, result._0);
  } else {
    return result._0;
  }
}

function getExn(result) {
  return handleFail(result, Exception$Wonderjs.throwErr);
}

exports.succeed = succeed;
exports.fail = fail;
exports._raiseErrorAndReturn = _raiseErrorAndReturn;
exports.failWith = failWith;
exports.either = either;
exports.bind = bind;
exports.tap = tap;
exports.tryCatch = tryCatch;
exports.mapSuccess = mapSuccess;
exports.handleFail = handleFail;
exports.getExn = getExn;
/* No side effect */
