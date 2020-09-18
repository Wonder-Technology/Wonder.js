'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("./Result.bs.js");
var OptionSt$Wonderjs = require("./OptionSt.bs.js");

function openInverse(resultOptionData) {
  return Result$Wonderjs.bind(resultOptionData, OptionSt$Wonderjs.get);
}

function openInverseSucceedWithNone(resultOptionData, handleSomeFunc) {
  return Result$Wonderjs.bind(resultOptionData, (function (valueOpt) {
                if (valueOpt !== undefined) {
                  return Curry._1(handleSomeFunc, Caml_option.valFromOption(valueOpt));
                } else {
                  return Result$Wonderjs.succeed(undefined);
                }
              }));
}

exports.openInverse = openInverse;
exports.openInverseSucceedWithNone = openInverseSucceedWithNone;
/* No side effect */
