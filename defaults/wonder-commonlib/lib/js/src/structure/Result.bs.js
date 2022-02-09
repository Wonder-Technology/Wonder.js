'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var Exception$WonderCommonlib = require("./Exception.bs.js");

function succeed(x) {
  return {
          TAG: /* Ok */0,
          _0: x
        };
}

function fail(x) {
  return {
          TAG: /* Error */1,
          _0: x
        };
}

var _buildErr = Exception$WonderCommonlib.buildErr;

function failWith(x) {
  return {
          TAG: /* Error */1,
          _0: Exception$WonderCommonlib.buildErr(x)
        };
}

function isSuccess(result) {
  if (result.TAG === /* Ok */0) {
    return true;
  } else {
    return false;
  }
}

function either(result, successFunc, failureFunc) {
  if (result.TAG === /* Ok */0) {
    return Curry._1(successFunc, result._0);
  } else {
    return Curry._1(failureFunc, result._0);
  }
}

function bind(result, switchFunc) {
  return either(result, switchFunc, fail);
}

function tap(result, oneTrackFunc) {
  return either(result, (function (result) {
                Curry._1(oneTrackFunc, result);
                return {
                        TAG: /* Ok */0,
                        _0: result
                      };
              }), fail);
}

function tryCatch(oneTrackFunc) {
  try {
    return {
            TAG: /* Ok */0,
            _0: Curry._1(oneTrackFunc, undefined)
          };
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e.RE_EXN_ID === Js_exn.$$Error) {
      return {
              TAG: /* Error */1,
              _0: e._1
            };
    } else {
      return {
              TAG: /* Error */1,
              _0: Exception$WonderCommonlib.buildErr("unknown error: " + e)
            };
    }
  }
}

function mapSuccess(result, mapFunc) {
  if (result.TAG === /* Ok */0) {
    return {
            TAG: /* Ok */0,
            _0: Curry._1(mapFunc, result._0)
          };
  } else {
    return {
            TAG: /* Error */1,
            _0: result._0
          };
  }
}

function handleFail(result, handleFailFunc) {
  if (result.TAG === /* Ok */0) {
    return result._0;
  } else {
    return Curry._1(handleFailFunc, result._0);
  }
}

function getExn(result) {
  return handleFail(result, Exception$WonderCommonlib.throwErr);
}

function toNullable(result) {
  if (result.TAG === /* Ok */0) {
    return result._0;
  } else {
    return null;
  }
}

function open_(resultResultData) {
  if (resultResultData.TAG === /* Ok */0) {
    return resultResultData._0;
  } else {
    return {
            TAG: /* Error */1,
            _0: resultResultData._0
          };
  }
}

exports.succeed = succeed;
exports.fail = fail;
exports._buildErr = _buildErr;
exports.failWith = failWith;
exports.isSuccess = isSuccess;
exports.either = either;
exports.bind = bind;
exports.tap = tap;
exports.tryCatch = tryCatch;
exports.mapSuccess = mapSuccess;
exports.handleFail = handleFail;
exports.getExn = getExn;
exports.toNullable = toNullable;
exports.open_ = open_;
/* No side effect */
