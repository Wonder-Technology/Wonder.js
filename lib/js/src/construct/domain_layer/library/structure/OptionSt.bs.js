'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("./Result.bs.js");

function unsafeGet(prim) {
  return prim;
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

var getExn = Belt_Option.getExn;

var getWithDefault = Belt_Option.getWithDefault;

var isSome = Belt_Option.isSome;

var map = Belt_Option.map;

exports.unsafeGet = unsafeGet;
exports.getExn = getExn;
exports.get = get;
exports.getWithDefault = getWithDefault;
exports.isSome = isSome;
exports.map = map;
exports.fromNullable = fromNullable;
/* No side effect */
