

import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Result$WonderCommonlib from "../Result.bs.js";
import * as OptionSt$WonderCommonlib from "../OptionSt.bs.js";

function create(x, y) {
  return [
          x,
          y
        ];
}

function collectOption(optionData1, optionData2) {
  if (optionData1 !== undefined && optionData2 !== undefined) {
    return Result$WonderCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2)
              ]);
  } else {
    return OptionSt$WonderCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2) {
  return Result$WonderCommonlib.bind(resultData1, (function (data1) {
                return Result$WonderCommonlib.mapSuccess(resultData2, (function (data2) {
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

export {
  create ,
  collectOption ,
  collectResult ,
  getFirst ,
  getLast ,
  
}
/* No side effect */
