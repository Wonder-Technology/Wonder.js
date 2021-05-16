

import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function buildLoadedDataView(totalLoadedByteLength, param) {
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, loadedUint8Array) {
          var uint8Array = param[1];
          var byteOffset = param[0];
          uint8Array.set(loadedUint8Array, byteOffset);
          return /* tuple */[
                  byteOffset + loadedUint8Array.byteLength | 0,
                  uint8Array
                ];
        }), /* tuple */[
        0,
        param[1]
      ], param[0]);
  return DataViewCommon$Wonderjs.create(match[1].buffer);
}

export {
  buildLoadedDataView ,
  
}
/* No side effect */
