'use strict';

var ListSt$WonderCommonlib = require("./ListSt.bs.js");
var Result$WonderCommonlib = require("./Result.bs.js");

function mergeResults(resultList) {
  return ListSt$WonderCommonlib.reduce(resultList, Result$WonderCommonlib.succeed(undefined), (function (mergedResult, result) {
                return Result$WonderCommonlib.bind(mergedResult, (function (param) {
                              return result;
                            }));
              }));
}

exports.mergeResults = mergeResults;
/* No side effect */
