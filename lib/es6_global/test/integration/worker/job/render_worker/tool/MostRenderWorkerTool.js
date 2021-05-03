

import * as Most from "most";
import * as Curry from "./../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function concatStreamFuncArray(dataForfirstStreamFunc, stateData, streamFuncArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (stream1, streamFunc2) {
                return Most.concatMap((function (e) {
                              return Curry._2(streamFunc2, e, stateData);
                            }), stream1);
              }), Curry._2(Caml_array.caml_array_get(streamFuncArr, 0), Caml_option.some(dataForfirstStreamFunc), stateData), streamFuncArr.slice(1));
}

export {
  concatStreamFuncArray ,
  
}
/* most Not a pure module */
