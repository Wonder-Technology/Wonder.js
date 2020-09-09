'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("./Result.bs.js");

function unsafeGet(prim) {
  return prim;
}

function buildFailResult(param) {
  return Result$Wonderjs.failWith("data not exist in option data");
}

function get(optionData) {
  if (optionData !== undefined) {
    return Result$Wonderjs.succeed(Caml_option.valFromOption(optionData));
  } else {
    return Result$Wonderjs.failWith("data not exist in option data");
  }
}

function fromNullable(x) {
  if (x == null) {
    return ;
  } else {
    return Caml_option.some(x);
  }
}

function sequenceResultM(optionData) {
  if (optionData !== undefined) {
    return Result$Wonderjs.mapSuccess(optionData, (function (value) {
                  return Caml_option.some(value);
                }));
  } else {
    return Result$Wonderjs.failWith("data not exist in option data");
  }
}

function open_(optionOptionData) {
  if (optionOptionData !== undefined) {
    return Caml_option.valFromOption(optionOptionData);
  }
  
}

var getExn = Belt_Option.getExn;

var getWithDefault = Belt_Option.getWithDefault;

var isSome = Belt_Option.isSome;

var map = Belt_Option.map;

var flatMap = Belt_Option.flatMap;

exports.unsafeGet = unsafeGet;
exports.getExn = getExn;
exports.buildFailResult = buildFailResult;
exports.get = get;
exports.getWithDefault = getWithDefault;
exports.isSome = isSome;
exports.map = map;
exports.flatMap = flatMap;
exports.fromNullable = fromNullable;
exports.sequenceResultM = sequenceResultM;
exports.open_ = open_;
/* No side effect */
