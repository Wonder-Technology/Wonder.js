'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var Result$WonderCommonlib = require("./Result.bs.js");

function unsafeGet(prim) {
  return prim;
}

var _getExn = ((nullableData) => {
  if (nullableData !== undefined) {
    return nullableData;
  }

  throw new Error("Not_found")
});

var getExn = _getExn;

function buildFailResult(param) {
  return Result$WonderCommonlib.failWith("data not exist in option data");
}

function get(optionData) {
  if (optionData !== undefined) {
    return Result$WonderCommonlib.succeed(Caml_option.valFromOption(optionData));
  } else {
    return Result$WonderCommonlib.failWith("data not exist in option data");
  }
}

function fromNullable(optionData) {
  if (optionData == null) {
    return ;
  } else {
    return Caml_option.some(optionData);
  }
}

var toNullable = Js_null_undefined.from_opt;

function forEachResult(optionData, func) {
  if (optionData !== undefined) {
    return Curry._1(func, Caml_option.valFromOption(optionData));
  } else {
    return Result$WonderCommonlib.succeed(undefined);
  }
}

function sequenceResultM(optionData) {
  if (optionData !== undefined) {
    return Result$WonderCommonlib.mapSuccess(optionData, (function (value) {
                  return Caml_option.some(value);
                }));
  } else {
    return Result$WonderCommonlib.succeed(undefined);
  }
}

function open_(optionOptionData) {
  if (optionOptionData !== undefined) {
    return Caml_option.valFromOption(optionOptionData);
  }
  
}

var getWithDefault = Belt_Option.getWithDefault;

var isSome = Belt_Option.isSome;

var map = Belt_Option.map;

var bind = Belt_Option.flatMap;

exports.unsafeGet = unsafeGet;
exports._getExn = _getExn;
exports.getExn = getExn;
exports.buildFailResult = buildFailResult;
exports.get = get;
exports.getWithDefault = getWithDefault;
exports.isSome = isSome;
exports.map = map;
exports.bind = bind;
exports.fromNullable = fromNullable;
exports.toNullable = toNullable;
exports.forEachResult = forEachResult;
exports.sequenceResultM = sequenceResultM;
exports.open_ = open_;
/* No side effect */
