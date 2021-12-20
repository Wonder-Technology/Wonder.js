

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_exn from "../../../../../../node_modules/rescript/lib/es6/js_exn.js";
import * as Caml_obj from "../../../../../../node_modules/rescript/lib/es6/caml_obj.js";
import * as Belt_List from "../../../../../../node_modules/rescript/lib/es6/belt_List.js";
import * as Js_option from "../../../../../../node_modules/rescript/lib/es6/js_option.js";
import * as Caml_js_exceptions from "../../../../../../node_modules/rescript/lib/es6/caml_js_exceptions.js";
import * as Result$WonderCommonlib from "../structure/Result.bs.js";

function _assert(result, message) {
  return result;
}

function test(message, func) {
  if (Curry._1(func, undefined)) {
    return ;
  } else {
    return Js_exn.raiseError(message);
  }
}

function requireCheck(f, isTest) {
  if (!isTest) {
    return Result$WonderCommonlib.succeed(undefined);
  }
  try {
    return Result$WonderCommonlib.succeed(Curry._1(f, undefined));
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e.RE_EXN_ID === Js_exn.$$Error) {
      return Result$WonderCommonlib.fail(e._1);
    }
    throw e;
  }
}

function ensureCheck(returnVal, f, isTest) {
  if (!isTest) {
    return Result$WonderCommonlib.succeed(returnVal);
  }
  try {
    return Result$WonderCommonlib.mapSuccess(Result$WonderCommonlib.succeed(Curry._1(f, returnVal)), (function (param) {
                  return returnVal;
                }));
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    if (e.RE_EXN_ID === Js_exn.$$Error) {
      return Result$WonderCommonlib.fail(e._1);
    }
    throw e;
  }
}

function assertPass(param) {
  return true;
}

function assertTrue(source) {
  return source === true;
}

function assertFalse(source) {
  return source === false;
}

function assertJsTrue(source) {
  return source === true;
}

function assertJsFalse(source) {
  return source === false;
}

function assertIsBool(source) {
  if (source === true) {
    return true;
  } else {
    return source === false;
  }
}

var _isNullableExist = (function(source) {
    return source !== undefined && source !== null;
});

var assertNullableExist = _isNullableExist;

function _isNullableListExist(sourceList) {
  return Js_option.isNone(Belt_List.getBy(sourceList, (function (source) {
                    return source == null;
                  })));
}

var assertNullableListExist = _isNullableListExist;

var assertExist = Js_option.isSome;

var assertNotExist = Js_option.isNone;

function _getEqualMessage(source, target) {
  return "\"expect to be " + target + ", but actual is " + source + "\"";
}

function assertEqual(kind, source, target) {
  _getEqualMessage(source, target);
  return Caml_obj.caml_equal(source, target);
}

function _getNotEqualMessage(source, target) {
  return "\"expect not to be " + target + ", but actual is " + source + "\"";
}

function assertNotEqual(kind, source, target) {
  _getNotEqualMessage(source, target);
  return Caml_obj.caml_notequal(source, target);
}

function assertGt(kind, source, target) {
  return Caml_obj.caml_greaterthan(source, target);
}

function assertGte(kind, source, target) {
  return Caml_obj.caml_greaterequal(source, target);
}

function assertLt(kind, source, target) {
  return Caml_obj.caml_lessthan(source, target);
}

function assertLte(kind, source, target) {
  return Caml_obj.caml_lessequal(source, target);
}

function $eq(a, b) {
  return assertEqual(/* Int */0, a, b);
}

function $eq$eq$dot(a, b) {
  return assertEqual(/* Float */1, a, b);
}

function $eq$eq$caret(a, b) {
  return assertEqual(/* String */2, a, b);
}

function $less$great$eq(a, b) {
  return assertNotEqual(/* Int */0, a, b);
}

function $less$great$eq$dot(a, b) {
  return assertNotEqual(/* Float */1, a, b);
}

var $great = Caml_obj.caml_greaterthan;

var $great$dot = Caml_obj.caml_greaterthan;

var $great$eq = Caml_obj.caml_greaterequal;

var $great$eq$dot = Caml_obj.caml_greaterequal;

var $less = Caml_obj.caml_lessthan;

var $less$dot = Caml_obj.caml_lessthan;

var $less$eq = Caml_obj.caml_lessequal;

var $less$eq$dot = Caml_obj.caml_lessequal;

var Operators = {
  $eq: $eq,
  $eq$eq$dot: $eq$eq$dot,
  $eq$eq$caret: $eq$eq$caret,
  $less$great$eq: $less$great$eq,
  $less$great$eq$dot: $less$great$eq$dot,
  $great: $great,
  $great$dot: $great$dot,
  $great$eq: $great$eq,
  $great$eq$dot: $great$eq$dot,
  $less: $less,
  $less$dot: $less$dot,
  $less$eq: $less$eq,
  $less$eq$dot: $less$eq$dot
};

export {
  _assert ,
  test ,
  requireCheck ,
  ensureCheck ,
  assertPass ,
  assertTrue ,
  assertFalse ,
  assertJsTrue ,
  assertJsFalse ,
  assertIsBool ,
  _isNullableExist ,
  assertNullableExist ,
  _isNullableListExist ,
  assertNullableListExist ,
  assertExist ,
  assertNotExist ,
  _getEqualMessage ,
  assertEqual ,
  _getNotEqualMessage ,
  assertNotEqual ,
  assertGt ,
  assertGte ,
  assertLt ,
  assertLte ,
  Operators ,
  
}
/* No side effect */
