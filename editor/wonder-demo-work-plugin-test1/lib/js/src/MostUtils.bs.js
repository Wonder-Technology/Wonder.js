'use strict';

var Most = require("most");
var Curry = require("rescript/lib/js/curry.js");

function callFunc(func) {
  var __x = Most.just(func);
  return Most.map((function (func) {
                return Curry._1(func, undefined);
              }), __x);
}

exports.callFunc = callFunc;
/* most Not a pure module */
