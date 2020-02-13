'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");

function testStream(testFunc, stream) {
  var valueRef = /* record */[/* contents */-1];
  return Most.forEach((function (value) {
                  valueRef[0] = value;
                  return /* () */0;
                }), stream).then((function (param) {
                return Curry._1(testFunc, valueRef[0]);
              }));
}

exports.testStream = testStream;
/* most Not a pure module */
