'use strict';

var ListSt$Wonderjs = require("./ListSt.bs.js");
var Result$Wonderjs = require("./Result.bs.js");

function mergeResults(resultList) {
  return ListSt$Wonderjs.reduce(resultList, Result$Wonderjs.succeed(undefined), (function (mergedResult, result) {
                return Result$Wonderjs.bind(mergedResult, (function (param) {
                              return result;
                            }));
              }));
}

exports.mergeResults = mergeResults;
/* No side effect */
