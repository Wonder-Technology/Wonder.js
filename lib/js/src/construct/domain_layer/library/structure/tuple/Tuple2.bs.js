'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("../Result.bs.js");
var OptionSt$Wonderjs = require("../OptionSt.bs.js");

function create(x, y) {
  return [
          x,
          y
        ];
}

function collectOption(optionData1, optionData2) {
  if (optionData1 !== undefined && optionData2 !== undefined) {
    return Result$Wonderjs.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2)
              ]);
  } else {
    return OptionSt$Wonderjs.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2) {
  return Result$Wonderjs.bind(resultData1, (function (data1) {
                return Result$Wonderjs.mapSuccess(resultData2, (function (data2) {
                              return [
                                      data1,
                                      data2
                                    ];
                            }));
              }));
}

function getFirst(param) {
  return param[0];
}

function getLast(param) {
  return param[1];
}

function map(func, param) {
  return [
          Curry._1(func, param[0]),
          Curry._1(func, param[1])
        ];
}

exports.create = create;
exports.collectOption = collectOption;
exports.collectResult = collectResult;
exports.getFirst = getFirst;
exports.getLast = getLast;
exports.map = map;
/* No side effect */
