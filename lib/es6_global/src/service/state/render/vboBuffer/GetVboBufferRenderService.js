

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getOrCreateBuffer(gl, param, param$1, state) {
  var bufferMap = param[1];
  var geometryIndex = param[0];
  var match = SparseMapService$WonderCommonlib.get(geometryIndex, bufferMap);
  if (match !== undefined) {
    return Js_primitive.valFromOption(match);
  } else {
    var buffer = param$1[0](gl, param$1[1](geometryIndex, state), state);
    SparseMapService$WonderCommonlib.set(geometryIndex, buffer, bufferMap);
    return buffer;
  }
}

export {
  getOrCreateBuffer ,
  
}
/* No side effect */
