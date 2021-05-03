'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

function concatStreamFuncArray(dataForfirstStreamFunc, stateData, streamFuncArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (stream1, streamFunc2) {
                return Most.concatMap((function (e) {
                              return Curry._2(streamFunc2, e, stateData);
                            }), stream1);
              }), Curry._2(Caml_array.caml_array_get(streamFuncArr, 0), Caml_option.some(dataForfirstStreamFunc), stateData), streamFuncArr.slice(1));
}

exports.concatStreamFuncArray = concatStreamFuncArray;
/* most Not a pure module */
