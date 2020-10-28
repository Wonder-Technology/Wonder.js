'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Result$Wonderjs = require("../Result.bs.js");
var OptionSt$Wonderjs = require("../OptionSt.bs.js");

function collectOption(optionData1, optionData2, optionData3, optionData4, optionData5, optionData6, optionData7) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined && optionData4 !== undefined && optionData5 !== undefined && optionData6 !== undefined && optionData7 !== undefined) {
    return Result$Wonderjs.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3),
                Caml_option.valFromOption(optionData4),
                Caml_option.valFromOption(optionData5),
                Caml_option.valFromOption(optionData6),
                Caml_option.valFromOption(optionData7)
              ]);
  } else {
    return OptionSt$Wonderjs.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3, resultData4, resultData5, resultData6, resultData7) {
  return Result$Wonderjs.bind(resultData1, (function (data1) {
                return Result$Wonderjs.bind(resultData2, (function (data2) {
                              return Result$Wonderjs.bind(resultData3, (function (data3) {
                                            return Result$Wonderjs.bind(resultData4, (function (data4) {
                                                          return Result$Wonderjs.bind(resultData5, (function (data5) {
                                                                        return Result$Wonderjs.bind(resultData6, (function (data6) {
                                                                                      return Result$Wonderjs.mapSuccess(resultData7, (function (data7) {
                                                                                                    return [
                                                                                                            data1,
                                                                                                            data2,
                                                                                                            data3,
                                                                                                            data4,
                                                                                                            data5,
                                                                                                            data6,
                                                                                                            data7
                                                                                                          ];
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

exports.collectOption = collectOption;
exports.collectResult = collectResult;
/* No side effect */
