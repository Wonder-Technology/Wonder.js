

import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as Result$WonderCommonlib from "../Result.bs.js";
import * as OptionSt$WonderCommonlib from "../OptionSt.bs.js";

function map(param, func) {
  return [
          Curry._1(func, param[0]),
          Curry._1(func, param[1]),
          Curry._1(func, param[2])
        ];
}

function collectOption(optionData1, optionData2, optionData3) {
  if (optionData1 !== undefined && optionData2 !== undefined && optionData3 !== undefined) {
    return Result$WonderCommonlib.succeed([
                Caml_option.valFromOption(optionData1),
                Caml_option.valFromOption(optionData2),
                Caml_option.valFromOption(optionData3)
              ]);
  } else {
    return OptionSt$WonderCommonlib.buildFailResult(undefined);
  }
}

function collectResult(resultData1, resultData2, resultData3) {
  return Result$WonderCommonlib.bind(resultData1, (function (data1) {
                return Result$WonderCommonlib.bind(resultData2, (function (data2) {
                              return Result$WonderCommonlib.mapSuccess(resultData3, (function (data3) {
                                            return [
                                                    data1,
                                                    data2,
                                                    data3
                                                  ];
                                          }));
                            }));
              }));
}

export {
  map ,
  collectOption ,
  collectResult ,
  
}
/* No side effect */
