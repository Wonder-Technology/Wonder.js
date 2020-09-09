'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("../Result.bs.js");
var OptionSt$Wonderjs = require("../OptionSt.bs.js");

function map(param, func) {
  return [
          Curry._1(func, param[0]),
          Curry._1(func, param[1]),
          Curry._1(func, param[2])
        ];
}

function collectOption(optionData1, optionData2, optionData3) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined) {
    return Result$Wonderjs.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3)
              ]);
  } else {
    return OptionSt$Wonderjs.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3) {
  return Result$Wonderjs.bind(resultData1, (function (data1) {
                return Result$Wonderjs.bind(resultData2, (function (data2) {
                              return Result$Wonderjs.mapSuccess(resultData3, (function (data3) {
                                            return [
                                                    data1,
                                                    data2,
                                                    data3
                                                  ];
                                          }));
                            }));
              }));
}

exports.map = map;
exports.collectOption = collectOption;
exports.collectResult = collectResult;
/* No side effect */
