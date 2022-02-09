

import * as ListSt$WonderCommonlib from "./ListSt.bs.js";
import * as Result$WonderCommonlib from "./Result.bs.js";

function mergeResults(resultList) {
  return ListSt$WonderCommonlib.reduce(resultList, Result$WonderCommonlib.succeed(undefined), (function (mergedResult, result) {
                return Result$WonderCommonlib.bind(mergedResult, (function (param) {
                              return result;
                            }));
              }));
}

export {
  mergeResults ,
  
}
/* No side effect */
