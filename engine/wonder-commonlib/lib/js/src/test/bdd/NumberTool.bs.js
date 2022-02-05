'use strict';

var ArraySt$WonderCommonlib = require("../../structure/ArraySt.bs.js");
var OptionSt$WonderCommonlib = require("../../structure/OptionSt.bs.js");
var ArgumentsTool$WonderCommonlib = require("./ArgumentsTool.bs.js");

function getExnAndConvertArgumentsToNumber($$arguments) {
  return ArraySt$WonderCommonlib.map(ArgumentsTool$WonderCommonlib.getArgumentsArr(OptionSt$WonderCommonlib.getExn($$arguments)), (function (prim) {
                return Number(prim);
              }));
}

exports.getExnAndConvertArgumentsToNumber = getExnAndConvertArgumentsToNumber;
/* No side effect */
